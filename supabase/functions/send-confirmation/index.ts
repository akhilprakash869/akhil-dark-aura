import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT = 3; // 3 submissions per hour per IP
const WINDOW_MS = 3600000; // 1 hour in milliseconds

// Validation schema matching frontend
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

// HTML sanitization - escape HTML special characters
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    const now = Date.now();
    const attempts = rateLimit.get(clientIP) || [];
    const recentAttempts = attempts.filter(time => now - time < WINDOW_MS);
    
    if (recentAttempts.length >= RATE_LIMIT) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    
    // Update rate limit tracking
    recentAttempts.push(now);
    rateLimit.set(clientIP, recentAttempts);
    
    // Clean up old entries periodically (keep last 1000 IPs)
    if (rateLimit.size > 1000) {
      const oldestKey = Array.from(rateLimit.keys())[0];
      rateLimit.delete(oldestKey);
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validation = contactSchema.safeParse(body);
    
    if (!validation.success) {
      console.log("Validation failed:", validation.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input data',
          details: validation.error.errors 
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    
    const { name, email, message } = validation.data;
    
    console.log("Sending confirmation email");
    
    // Sanitize user input before embedding in HTML
    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message);

    const emailResponse = await resend.emails.send({
      from: "Nathan Theresa <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting us!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Thank you for reaching out, ${safeName}!
          </h1>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            We have received your message and will get back to you as soon as possible.
          </p>
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
            <p style="color: #666; font-style: italic; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            <strong>Nathan Theresa</strong>
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

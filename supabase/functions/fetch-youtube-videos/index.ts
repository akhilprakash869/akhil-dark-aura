import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const channelHandle = "akhilnathan2622";
    
    console.log(`Fetching videos for channel: @${channelHandle}`);

    // First, get the channel ID from the handle
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=@${channelHandle}&key=${YOUTUBE_API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Channel not found");
    }

    const channelId = channelData.items[0].snippet.channelId;
    console.log(`Found channel ID: ${channelId}`);

    // Get the latest public videos from the channel
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    const videos: YouTubeVideo[] = videosData.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
    }));

    console.log(`Successfully fetched ${videos.length} videos`);

    return new Response(
      JSON.stringify({ videos }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch YouTube videos";
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        videos: []
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);

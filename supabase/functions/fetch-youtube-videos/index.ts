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
  viewCount: string;
  publishedAt: string;
  duration: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pageToken } = await req.json().catch(() => ({}));
    const channelHandle = "akhilnathan2622";
    const maxResults = 10;
    
    console.log(`Fetching videos for channel: @${channelHandle}`, pageToken ? `with pageToken: ${pageToken}` : '');

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
    const pageTokenParam = pageToken ? `&pageToken=${pageToken}` : '';
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}${pageTokenParam}&key=${YOUTUBE_API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    // Get video IDs to fetch statistics and duration
    const videoIds = videosData.items.map((item: any) => item.id.videoId).join(',');
    
    // Fetch detailed video information including statistics and duration
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    if (!detailsResponse.ok) {
      throw new Error(`YouTube API error: ${detailsResponse.status}`);
    }

    const detailsData = await detailsResponse.json();
    
    // Create a map of video details for easy lookup
    const videoDetailsMap = new Map();
    detailsData.items.forEach((item: any) => {
      videoDetailsMap.set(item.id, {
        viewCount: item.statistics.viewCount,
        duration: item.contentDetails.duration,
      });
    });

    const videos: YouTubeVideo[] = videosData.items.map((item: any) => {
      const details = videoDetailsMap.get(item.id.videoId);
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        viewCount: details?.viewCount || '0',
        publishedAt: item.snippet.publishedAt,
        duration: details?.duration || 'PT0S',
      };
    });

    console.log(`Successfully fetched ${videos.length} videos with statistics`);

    return new Response(
      JSON.stringify({ 
        videos,
        nextPageToken: videosData.nextPageToken || null
      }),
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

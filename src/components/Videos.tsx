import { Play, ExternalLink, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Videos = () => {
  // You can easily update these video links with your own YouTube videos
  // Just replace the videoId with your YouTube video ID
  const [videos] = useState([
    {
      title: "React Fundamentals Explained",
      videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
      description: "A comprehensive guide to React basics and core concepts",
    },
    {
      title: "JavaScript Tips & Tricks",
      videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
      description: "Advanced JavaScript patterns and best practices",
    },
    {
      title: "Building REST APIs with Node.js",
      videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
      description: "Step-by-step guide to creating scalable backend APIs",
    },
    {
      title: "Modern CSS Techniques",
      videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
      description: "Latest CSS features and responsive design patterns",
    },
  ]);

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const getYouTubeUrl = (videoId: string) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <section id="videos" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">My Videos</span>
            </h2>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary-glow mb-4 rounded-full"></div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Visual tutorials and tech content to help you learn better. Subscribe to my YouTube channel for more content!
          </p>

          {/* Instructions Card */}
          <Card className="glass-effect border-border/50 p-6 mb-8 animate-fade-in">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              How to Add Your Videos
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>1. Open <code className="bg-primary/20 px-2 py-1 rounded">src/components/Videos.tsx</code></p>
              <p>2. Find the <code className="bg-primary/20 px-2 py-1 rounded">videos</code> array</p>
              <p>3. Replace the <code className="bg-primary/20 px-2 py-1 rounded">videoId</code> values with your YouTube video IDs</p>
              <p className="text-xs pt-2">💡 Tip: The video ID is the part after "v=" in your YouTube URL</p>
              <p className="text-xs">Example: youtube.com/watch?v=<span className="text-primary">dQw4w9WgXcQ</span></p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <Card
                key={index}
                className="group overflow-hidden glass-effect border-border/50 hover-glow transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={getYouTubeThumbnail(video.videoId)}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if thumbnail doesn't load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop";
                    }}
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover-glow">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {video.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary/50 hover:bg-primary hover:text-primary-foreground"
                  >
                    <a
                      href={getYouTubeUrl(video.videoId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Watch on YouTube
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* YouTube Channel Link */}
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover-glow"
            >
              <a
                href="https://youtube.com/@yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Subscribe to My Channel
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;

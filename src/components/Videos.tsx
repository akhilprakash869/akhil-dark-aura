import { Play, Eye } from "lucide-react";

const Videos = () => {
  const videos = [
    {
      title: "React Fundamentals Explained",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      views: "1.2K",
      duration: "12:34",
    },
    {
      title: "JavaScript Tips & Tricks",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=450&fit=crop",
      views: "2.5K",
      duration: "8:45",
    },
    {
      title: "Building REST APIs with Node.js",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
      views: "3.1K",
      duration: "15:20",
    },
    {
      title: "Modern CSS Techniques",
      thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop",
      views: "1.8K",
      duration: "10:15",
    },
  ];

  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-background to-background/50 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Video Content</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-4 rounded-full"></div>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Visual tutorials and tech content to help you learn better
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl glass-effect hover-glow transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover-glow">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;

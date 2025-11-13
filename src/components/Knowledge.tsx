import { FileText, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Knowledge = () => {
  const posts = [
    {
      title: "Getting Started with React Hooks",
      description: "A comprehensive guide to understanding and using React Hooks effectively in your projects.",
      date: "2024-03-15",
      category: "React",
    },
    {
      title: "JavaScript ES6+ Features You Should Know",
      description: "Exploring modern JavaScript features that will make your code cleaner and more efficient.",
      date: "2024-03-10",
      category: "JavaScript",
    },
    {
      title: "Building Scalable Node.js Applications",
      description: "Best practices and patterns for creating maintainable backend applications with Node.js.",
      date: "2024-03-05",
      category: "Node.js",
    },
    {
      title: "CSS Grid vs Flexbox: When to Use What",
      description: "Understanding the differences and use cases for CSS Grid and Flexbox layouts.",
      date: "2024-02-28",
      category: "CSS",
    },
  ];

  return (
    <section id="knowledge" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Knowledge Hub</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-4 rounded-full"></div>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Sharing my learning journey, tutorials, and insights about web development
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <Card
                key={index}
                className="glass-effect border-border/50 hover-glow transition-all duration-300 hover:scale-105 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-primary mb-2">
                    <FileText className="w-4 h-4" />
                    <span>{post.category}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  <button className="text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Knowledge;

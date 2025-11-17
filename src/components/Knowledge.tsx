import { FileText, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  created_at: string;
}

const Knowledge = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <Card className="glass-effect border-border/50 p-12 text-center">
              <p className="text-muted-foreground">
                No articles published yet. Check back soon!
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Card
                  key={article.id}
                  className="glass-effect border-border/50 hover-glow transition-all duration-300 hover:scale-105 animate-fade-in group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/article/${article.slug}`)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <FileText className="w-4 h-4" />
                      <span>Article</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {article.excerpt || "Read this article to learn more..."}
                    </p>
                    <div className="text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Knowledge;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDistanceToNow } from "date-fns";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string;
  published_at: string;
  created_at: string;
}

const ArticleView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="p-12 text-center glass-effect border-border/50 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          {article.cover_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          <Card className="p-8 md:p-12 glass-effect border-border/50">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
              <Calendar className="w-4 h-4" />
              <span>
                Published {formatDistanceToNow(new Date(article.published_at || article.created_at), { addSuffix: true })}
              </span>
            </div>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </Card>
        </article>
      </div>
    </div>
  );
};

export default ArticleView;
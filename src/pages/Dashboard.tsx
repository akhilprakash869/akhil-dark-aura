import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchArticles();
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load articles",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Article deleted",
        description: "The article has been removed.",
      });
      fetchArticles();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete article",
      });
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("articles")
        .update({ 
          published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: currentStatus ? "Article unpublished" : "Article published",
        description: currentStatus 
          ? "The article is now hidden from public view." 
          : "The article is now visible to everyone.",
      });
      fetchArticles();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update article status",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">My Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              View Site
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Articles</h2>
            <p className="text-muted-foreground">
              Manage and publish your content
            </p>
          </div>
          <Button
            onClick={() => navigate("/editor")}
            className="bg-primary text-primary-foreground hover-glow"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>

        {articles.length === 0 ? (
          <Card className="p-12 text-center glass-effect border-border/50">
            <p className="text-muted-foreground mb-4">
              You haven't created any articles yet.
            </p>
            <Button onClick={() => navigate("/editor")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Article
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="p-6 glass-effect border-border/50 hover-glow transition-all"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{article.title}</h3>
                      {article.published ? (
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded-full">
                          Draft
                        </span>
                      )}
                    </div>
                    {article.excerpt && (
                      <p className="text-muted-foreground mb-2">{article.excerpt}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Updated {formatDistanceToNow(new Date(article.updated_at), { addSuffix: true })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePublish(article.id, article.published)}
                    >
                      {article.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/editor/${article.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
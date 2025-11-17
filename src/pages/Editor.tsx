import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Editor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [user, setUser] = useState<any>(null);
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

      if (id) {
        fetchArticle(id);
      }
    };

    checkAuth();
  }, [id, navigate]);

  const fetchArticle = async (articleId: string) => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", articleId)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt || "");
      setCoverImage(data.cover_image || "");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load article",
      });
      navigate("/dashboard");
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleSave = async (publish: boolean = false) => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Title and content are required",
      });
      return;
    }

    setLoading(true);

    try {
      const slug = generateSlug(title);
      const articleData = {
        user_id: user.id,
        title: title.trim(),
        slug,
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        cover_image: coverImage.trim() || null,
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
      };

      if (id) {
        const { error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Article updated",
          description: publish ? "Your article has been published!" : "Your changes have been saved.",
        });
      } else {
        const { error } = await supabase
          .from("articles")
          .insert([articleData]);

        if (error) throw error;

        toast({
          title: "Article created",
          description: publish ? "Your article has been published!" : "Your article has been saved as draft.",
        });
      }

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">
            {id ? "Edit Article" : "New Article"}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPreview(!preview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {preview ? "Edit" : "Preview"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={loading}
              className="bg-primary text-primary-foreground hover-glow"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Publish
            </Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!preview ? (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title..."
                className="mt-1 text-2xl font-bold"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt (optional)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of your article..."
                className="mt-1"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
              <Input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article here... Markdown is supported!"
                className="mt-1 font-mono"
                rows={20}
              />
            </div>
          </div>
        ) : (
          <Card className="p-8 glass-effect border-border/50">
            <article className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-bold mb-4">{title || "Untitled"}</h1>
              {excerpt && (
                <p className="text-xl text-muted-foreground mb-6">{excerpt}</p>
              )}
              {coverImage && (
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full rounded-lg mb-6"
                />
              )}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "*No content yet...*"}
              </ReactMarkdown>
            </article>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Editor;
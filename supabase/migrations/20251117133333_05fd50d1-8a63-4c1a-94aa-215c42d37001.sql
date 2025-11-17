-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policies for articles
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (published = true);

CREATE POLICY "Users can view their own articles" 
ON public.articles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own articles" 
ON public.articles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own articles" 
ON public.articles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-generate slug from title
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(trim(title), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Create index for better performance
CREATE INDEX idx_articles_user_id ON public.articles(user_id);
CREATE INDEX idx_articles_published ON public.articles(published);
CREATE INDEX idx_articles_slug ON public.articles(slug);
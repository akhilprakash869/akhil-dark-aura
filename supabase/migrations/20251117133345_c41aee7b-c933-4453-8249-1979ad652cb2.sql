-- Fix search path for generate_slug function
DROP FUNCTION IF EXISTS public.generate_slug(TEXT);

CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(trim(title), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$;
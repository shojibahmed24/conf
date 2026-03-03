-- SCHEMA UPDATE FOR DASHBOARD & AI

-- Add AI and Pro columns if they don't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_pro BOOLEAN DEFAULT FALSE;

ALTER TABLE public.confessions ADD COLUMN IF NOT EXISTS mood_tag TEXT;
ALTER TABLE public.confessions ADD COLUMN IF NOT EXISTS emotional_score JSONB DEFAULT '{"sad": 0, "hopeful": 0, "angry": 0, "lonely": 0, "neutral": 100}'::jsonb;
ALTER TABLE public.confessions ADD COLUMN IF NOT EXISTS ai_summary TEXT;
ALTER TABLE public.confessions ADD COLUMN IF NOT EXISTS plays_count INTEGER DEFAULT 0 CHECK (plays_count >= 0);

-- Ensure RLS is active
ALTER TABLE public.confessions ENABLE ROW LEVEL SECURITY;

-- RLS UPDATES
DROP POLICY IF EXISTS "Users can view own stats" ON public.confessions;
CREATE POLICY "Users can view own stats" ON public.confessions FOR SELECT USING (auth.uid() = user_id);

-- STORAGE BUCKETS INITIALIZATION
-- Note: This requires the storage schema to be present (standard in Supabase)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES 
  ('confessions', 'confessions', true, 52428800, ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/mp4']),
  ('comments', 'comments', true, 10485760, ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/mp4'])
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- INITIAL STORAGE POLICIES
DROP POLICY IF EXISTS "Public access" ON storage.objects;
CREATE POLICY "Public access" ON storage.objects FOR SELECT USING (bucket_id IN ('confessions', 'comments'));

DROP POLICY IF EXISTS "Authenticated upload" ON storage.objects;
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('confessions', 'comments') AND auth.role() = 'authenticated');
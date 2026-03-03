-- FINAL SECURITY AUDIT & HARDENING

-- 1. Profiles Table Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 2. Reactions Table Policies
DROP POLICY IF EXISTS "Reactions are viewable by everyone" ON public.reactions;
CREATE POLICY "Reactions are viewable by everyone" 
ON public.reactions FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Users can manage own reactions" ON public.reactions;
CREATE POLICY "Users can manage own reactions" 
ON public.reactions FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 3. Reports Table Policies
DROP POLICY IF EXISTS "Users can create reports" ON public.reports;
CREATE POLICY "Users can create reports" 
ON public.reports FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view own reports" ON public.reports;
CREATE POLICY "Users can view own reports" 
ON public.reports FOR SELECT 
USING (auth.uid() = reporter_id OR (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)));

-- 4. Confessions Deletion Policy
DROP POLICY IF EXISTS "Users can delete own confessions" ON public.confessions;
CREATE POLICY "Users can delete own confessions" 
ON public.confessions FOR DELETE 
USING (auth.uid() = user_id OR (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)));

-- 5. Comments Deletion Policy
DROP POLICY IF EXISTS "Users can delete own comments" ON public.comments;
CREATE POLICY "Users can delete own comments" 
ON public.comments FOR DELETE 
USING (auth.uid() = user_id OR (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)));

-- 6. Ensure increment_plays is restricted to active confessions
CREATE OR REPLACE FUNCTION public.increment_plays(confession_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.confessions
  SET plays_count = COALESCE(plays_count, 0) + 1
  WHERE id = confession_id
  AND status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
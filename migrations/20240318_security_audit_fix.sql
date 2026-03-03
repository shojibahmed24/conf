-- SECURITY AUDIT FIX: ADMIN POLICIES & FIELD PROTECTION

-- 1. Ensure Admin Update Policies exist for moderation
DROP POLICY IF EXISTS "Admins can update any confession" ON public.confessions;
CREATE POLICY "Admins can update any confession" 
ON public.confessions FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can update any comment" ON public.comments;
CREATE POLICY "Admins can update any comment" 
ON public.comments FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can update reports" ON public.reports;
CREATE POLICY "Admins can update reports" 
ON public.reports FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- 2. Re-verify Profile Protection Trigger
CREATE OR REPLACE FUNCTION public.protect_profile_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  ) THEN
    IF TG_OP = 'INSERT' THEN
      NEW.is_admin := FALSE;
      NEW.is_pro := FALSE;
    ELSIF TG_OP = 'UPDATE' THEN
      NEW.is_admin := OLD.is_admin;
      NEW.is_pro := OLD.is_pro;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_profile_update_protect ON public.profiles;
CREATE TRIGGER on_profile_update_protect
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.protect_profile_fields();

-- 3. Ensure Storage Policies are strict
DO $$
BEGIN
    DROP POLICY IF EXISTS "Strict authenticated upload" ON storage.objects;
    CREATE POLICY "Strict authenticated upload" 
    ON storage.objects FOR INSERT 
    WITH CHECK (
      bucket_id IN ('confessions', 'comments') 
      AND auth.role() = 'authenticated'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );

    DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
    CREATE POLICY "Users can delete own files" 
    ON storage.objects FOR DELETE 
    USING (
      bucket_id IN ('confessions', 'comments') 
      AND auth.role() = 'authenticated'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );
    
    DROP POLICY IF EXISTS "Admins can delete any file" ON storage.objects;
    CREATE POLICY "Admins can delete any file" 
    ON storage.objects FOR DELETE 
    USING (
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    );
END $$;
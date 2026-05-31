
-- Fix mutable search_path on the only function missing it
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- Tighten storage SELECT: drop broad listing policies (public file URLs still resolve via bucket public flag)
drop policy if exists "Avatar images are public" on storage.objects;
drop policy if exists "Chat images are public" on storage.objects;

-- Owners can list/manage only their own folder
create policy "Users can list own avatar files" on storage.objects for select to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users can list own chat files" on storage.objects for select to authenticated
  using (bucket_id = 'chat-images' and (storage.foldername(name))[1] = auth.uid()::text);

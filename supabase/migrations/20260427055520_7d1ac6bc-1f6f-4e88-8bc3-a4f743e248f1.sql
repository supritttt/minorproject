
-- ROLES
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users can view their own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);

-- Auto-create profile + default role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)), null);
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- REVIEWS
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  destination_slug text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (length(comment) between 1 and 2000),
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create index reviews_dest_idx on public.reviews(destination_slug, created_at desc);

create policy "Reviews are viewable by everyone" on public.reviews for select using (true);
create policy "Users can create their own reviews" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can update own reviews" on public.reviews for update to authenticated using (auth.uid() = user_id);
create policy "Users can delete own reviews" on public.reviews for delete to authenticated using (auth.uid() = user_id);

-- CHAT MESSAGES (per destination)
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  destination_slug text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text check (content is null or length(content) between 1 and 2000),
  image_url text,
  created_at timestamptz not null default now(),
  check (content is not null or image_url is not null)
);
alter table public.chat_messages enable row level security;
create index chat_msgs_dest_idx on public.chat_messages(destination_slug, created_at desc);

create policy "Chat messages are viewable by everyone" on public.chat_messages for select using (true);
create policy "Users can post their own messages" on public.chat_messages for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can delete own messages" on public.chat_messages for delete to authenticated using (auth.uid() = user_id);

-- Enable realtime for chat
alter publication supabase_realtime add table public.chat_messages;
alter table public.chat_messages replica identity full;

-- ITINERARIES
create table public.itineraries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'My Trip',
  items jsonb not null default '[]'::jsonb,
  share_token text not null default encode(gen_random_bytes(12), 'hex'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.itineraries enable row level security;
create unique index itineraries_share_token_idx on public.itineraries(share_token);

create policy "Owner can view their itineraries" on public.itineraries for select to authenticated using (auth.uid() = user_id);
create policy "Owner can create itineraries" on public.itineraries for insert to authenticated with check (auth.uid() = user_id);
create policy "Owner can update itineraries" on public.itineraries for update to authenticated using (auth.uid() = user_id);
create policy "Owner can delete itineraries" on public.itineraries for delete to authenticated using (auth.uid() = user_id);

create trigger itineraries_updated_at before update on public.itineraries
  for each row execute function public.set_updated_at();

-- Public read by share_token via security definer function
create or replace function public.get_itinerary_by_share_token(_token text)
returns table (id uuid, title text, items jsonb, created_at timestamptz, owner_name text)
language sql stable security definer set search_path = public
as $$
  select i.id, i.title, i.items, i.created_at, p.display_name
  from public.itineraries i
  left join public.profiles p on p.id = i.user_id
  where i.share_token = _token
$$;
grant execute on function public.get_itinerary_by_share_token(text) to anon, authenticated;

-- STORAGE BUCKETS
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('chat-images', 'chat-images', true) on conflict do nothing;

create policy "Avatar images are public" on storage.objects for select using (bucket_id = 'avatars');
create policy "Users can upload own avatar" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users can update own avatar" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Chat images are public" on storage.objects for select using (bucket_id = 'chat-images');
create policy "Users can upload chat images" on storage.objects for insert to authenticated
  with check (bucket_id = 'chat-images' and (storage.foldername(name))[1] = auth.uid()::text);

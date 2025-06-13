create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  book_id uuid references public.books(id) on delete cascade not null,
  status text check (status in ('active', 'expired')) not null default 'active',
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, book_id)
);

-- Enable Row Level Security
alter table public.subscriptions enable row level security;

-- Create policy to allow users to read their own subscriptions
create policy "Users can read their own subscriptions"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

-- Create policy to allow users to insert their own subscriptions
create policy "Users can insert their own subscriptions"
  on public.subscriptions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Create policy to allow users to update their own subscriptions
create policy "Users can update their own subscriptions"
  on public.subscriptions
  for update
  to authenticated
  using (auth.uid() = user_id);

-- Create policy to allow users to delete their own subscriptions
create policy "Users can delete their own subscriptions"
  on public.subscriptions
  for delete
  to authenticated
  using (auth.uid() = user_id); 
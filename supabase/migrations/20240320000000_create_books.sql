create table public.books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text not null,
  description text,
  cover_url text,
  audio_url text,
  duration integer,
  price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.books enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.books
  for select
  using (true);

-- Create policy to allow authenticated users to insert
create policy "Allow authenticated users to insert"
  on public.books
  for insert
  to authenticated
  with check (true);

-- Create policy to allow authenticated users to update
create policy "Allow authenticated users to update"
  on public.books
  for update
  to authenticated
  using (true);

-- Create policy to allow authenticated users to delete
create policy "Allow authenticated users to delete"
  on public.books
  for delete
  to authenticated
  using (true); 
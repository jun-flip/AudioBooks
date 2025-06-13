-- Create enum for user roles
create type public.user_role as enum ('admin', 'user');

-- Add role column to profiles table
alter table public.profiles
add column role user_role default 'user' not null;

-- Create policy to allow only admins to update roles
create policy "Only admins can update roles"
  on public.profiles
  for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create function to check if user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer; 
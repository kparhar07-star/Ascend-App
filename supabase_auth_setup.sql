-- Add user_id to ascensions table
alter table ascensions 
add column if not exists user_id uuid references auth.users default auth.uid();

-- Add user_id to journal_entries table
alter table journal_entries 
add column if not exists user_id uuid references auth.users default auth.uid();

-- Enable RLS on ascensions
alter table ascensions enable row level security;

-- Create policies for ascensions
create policy "Users can view their own ascensions" on ascensions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own ascensions" on ascensions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own ascensions" on ascensions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own ascensions" on ascensions
  for delete using (auth.uid() = user_id);

-- Enable RLS on journal_entries
alter table journal_entries enable row level security;

-- Create policies for journal_entries
create policy "Users can view their own journal entries" on journal_entries
  for select using (auth.uid() = user_id);

create policy "Users can insert their own journal entries" on journal_entries
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own journal entries" on journal_entries
  for update using (auth.uid() = user_id);

create policy "Users can delete their own journal entries" on journal_entries
  for delete using (auth.uid() = user_id);

-- Create a table for User Stats
create table if not exists user_stats (
  user_id uuid references auth.users primary key,
  coins int default 100,
  diamonds int default 20,
  exp int default 0,
  level int default 1
);

-- Enable RLS
alter table user_stats enable row level security;

-- Create policies
create policy "Users can view their own stats" on user_stats
  for select using (auth.uid() = user_id);

create policy "Users can update their own stats" on user_stats
  for update using (auth.uid() = user_id);

create policy "Users can insert their own stats" on user_stats
  for insert with check (auth.uid() = user_id);

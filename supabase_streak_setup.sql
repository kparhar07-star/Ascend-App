-- Create table for tracking daily activity (streaks)
create table if not exists daily_activity (
  user_id uuid references auth.users not null,
  activity_date date not null default CURRENT_DATE,
  primary key (user_id, activity_date)
);

-- Enable RLS
alter table daily_activity enable row level security;

-- Create policies
create policy "Users can view own activity" on daily_activity 
  for select using (auth.uid() = user_id);

create policy "Users can insert own activity" on daily_activity 
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own activity" on daily_activity 
  for delete using (auth.uid() = user_id);

-- Add completed_tasks column to daily_activity table to track specific tasks
alter table daily_activity 
add column if not exists completed_tasks jsonb default '[]'::jsonb;

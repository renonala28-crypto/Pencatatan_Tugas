create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  title text not null,
  course text not null,
  due_date date not null,
  status text not null default 'belum_mulai',
  notes text,
  result_url text,
  constraint tasks_title_length_check
    check (char_length(btrim(title)) between 1 and 120),
  constraint tasks_course_length_check
    check (char_length(btrim(course)) between 1 and 80),
  constraint tasks_status_check
    check (status in ('belum_mulai', 'dikerjakan', 'dikumpulkan')),
  constraint tasks_notes_length_check
    check (notes is null or char_length(notes) <= 1000),
  constraint tasks_result_url_check
    check (
      result_url is null
      or result_url ~* '^https?://[^[:space:]/?#]+([/?#][^[:space:]]*)?$'
    )
);

alter table public.tasks enable row level security;

revoke all privileges on table public.tasks from public, anon;
grant select, insert, update, delete on table public.tasks to authenticated;

create policy tasks_select_own
  on public.tasks
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy tasks_insert_own
  on public.tasks
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy tasks_update_own
  on public.tasks
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy tasks_delete_own
  on public.tasks
  for delete
  to authenticated
  using (auth.uid() = user_id);
class CreateSessions < ActiveRecord::Migration
  def up
    execute <<-SQL
      create table sessions (
        authentication_key uuid primary key default gen_random_uuid(),
        authentication_token varchar not null,
        user_id integer not null references users,
        ip varchar not null,
        user_agent varchar not null,
        expired_at timestamptz,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );
      create index sessions_user_id_idx on sessions (user_id);
      create index active_sessions_idx ON sessions (authentication_key)
        where expired_at is null;
    SQL
  end

  def down
    execute <<-SQL
      drop table sessions;
    SQL
  end
end

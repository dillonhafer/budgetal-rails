class ConvertBudgetDateTypes < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table budgets
        alter column year type integer using year::integer,
        alter column month type integer using month::integer,
        add constraint verify_year check (year >= 2013 and year <= 2200),
        add constraint verify_month check (month >= 1 and month <= 12),
        add constraint index_budgets_on_user_id_and_year_and_month unique (user_id, year, month);
    SQL
  end

  def down
    execute <<-SQL
      alter table budgets
        alter column year type varchar,
        alter column month type varchar,
        drop constraint verify_year,
        drop constraint verify_month,
        drop constraint index_budgets_on_user_id_and_year_and_month;
    SQL
  end
end

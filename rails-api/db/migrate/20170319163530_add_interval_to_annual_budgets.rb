class AddIntervalToAnnualBudgets < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table annual_budget_items
        add column payment_intervals integer not null default 12;

      alter table annual_budgets add constraint year_range check (year between 2013 and 2100);
    SQL
  end

  def down
    execute <<-SQL
      alter table annual_budget_items
        drop column payment_intervals;

      alter table annual_budgets drop constraint year_range;
    SQL
  end
end

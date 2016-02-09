class AddConstraintsToDatabase < ActiveRecord::Migration
  def up
    execute <<-SQL
      -- Clean up orphans from a bad database schema
      delete from budget_item_expenses where not exists (select null from budget_items where budget_item_expenses.budget_item_id = budget_items.id);
      delete from budget_items where not exists (select null from budget_categories where budget_items.budget_category_id = budget_categories.id);
      delete from budget_categories where not exists (select null from budgets where budget_categories.budget_id = budgets.id);
      delete from budgets where not exists (select null from users where budgets.user_id = users.id);

      delete from annual_budget_items where not exists (select null from annual_budgets where annual_budget_items.annual_budget_id = annual_budgets.id);
      delete from annual_budgets where not exists (select null from users where annual_budgets.user_id = users.id);

      delete from allocation_plan_budget_items where not exists (select null from allocation_plans where allocation_plan_budget_items.allocation_plan_id = allocation_plans.id);
      delete from allocation_plan_budget_items where not exists (select null from budget_items where allocation_plan_budget_items.budget_item_id = budget_items.id);
      delete from allocation_plans where not exists (select null from budgets where allocation_plans.budget_id = budgets.id);

      -- Budgets
      alter table budgets alter user_id set not null;
      alter table budgets alter month set not null;
      alter table budgets alter year set not null;
      alter table budgets alter monthly_income set not null;
      alter table budgets alter created_at set not null;
      alter table budgets alter updated_at set not null;
      alter table budgets
        add constraint user_foreign_key foreign key (user_id) references users;
      create index budgets_user_id_idx on budgets (user_id);

      -- Budget Categories
      alter table budget_categories alter budget_id set not null;
      alter table budget_categories alter name set not null;
      alter table budget_categories alter percentage set not null;
      alter table budget_categories alter created_at set not null;
      alter table budget_categories alter updated_at set not null;
      alter table budget_categories
        add constraint budget_id_foreign_key foreign key (budget_id) references budgets;
      create index budget_id_idx on budget_categories (budget_id);

      -- Budget Items
      alter table budget_items alter budget_category_id set not null;
      alter table budget_items alter name set not null;
      alter table budget_items alter amount_budgeted set not null;
      alter table budget_items alter created_at set not null;
      alter table budget_items alter updated_at set not null;
      alter table budget_items
        add constraint budget_category_foreign_key foreign key (budget_category_id) references budget_categories;
      create index budget_items_category_idx on budget_items (budget_category_id);

      -- Budget Item Expenses
      alter table budget_item_expenses alter budget_item_id set not null;
      alter table budget_item_expenses alter name set not null;
      alter table budget_item_expenses alter amount set not null;
      alter table budget_item_expenses alter date set not null;
      alter table budget_item_expenses alter created_at set not null;
      alter table budget_item_expenses alter updated_at set not null;
      alter table budget_item_expenses
        add constraint budget_item_foreign_key foreign key (budget_item_id) references budget_items;
      create index budget_item_expenses_item_idx on budget_item_expenses (budget_item_id);

      -- Annual Budgets
      alter table annual_budgets alter user_id set not null;
      alter table annual_budgets alter year set not null;
      alter table annual_budgets alter created_at set not null;
      alter table annual_budgets alter updated_at set not null;
      alter table annual_budgets
        add constraint annual_user_foreign_key foreign key (user_id) references users;
      create index annual_budgets_user_id_idx on annual_budgets (user_id);

      -- Annual Budget Items
      alter table annual_budget_items alter annual_budget_id set not null;
      alter table annual_budget_items alter name set not null;
      alter table annual_budget_items alter due_date set not null;
      alter table annual_budget_items alter amount set not null;
      alter table annual_budget_items alter created_at set not null;
      alter table annual_budget_items alter updated_at set not null;
      alter table annual_budget_items
        add constraint annual_budget_foreign_key foreign key (annual_budget_id) references annual_budgets;
      create index annual_budget_items_budget_id_idx on annual_budget_items (annual_budget_id);

      -- Allocation Plans
      alter table allocation_plans alter budget_id set not null;
      alter table allocation_plans alter start_date set not null;
      alter table allocation_plans alter end_date set not null;
      alter table allocation_plans alter income set not null;
      alter table allocation_plans alter created_at set not null;
      alter table allocation_plans alter updated_at set not null;
      alter table allocation_plans
        add constraint allocation_budget_foreign_key foreign key (budget_id) references budgets;
      create index allocation_plans_budget_id_idx on allocation_plans (budget_id);

      -- Allocation Plans Budget Items
      alter table allocation_plan_budget_items alter allocation_plan_id set not null;
      alter table allocation_plan_budget_items alter budget_item_id set not null;
      alter table allocation_plan_budget_items alter amount_budgeted set not null;
      alter table allocation_plan_budget_items alter created_at set not null;
      alter table allocation_plan_budget_items alter updated_at set not null;
      alter table allocation_plan_budget_items
        add constraint allocation_budget_itm_foreign_key foreign key (budget_item_id) references budget_items;
      create index allocation_plan_bdgt_itms_budget_id_idx on allocation_plan_budget_items (budget_item_id);
      alter table allocation_plan_budget_items
        add constraint allocation_pln_budget_foreign_key foreign key (allocation_plan_id) references allocation_plans;
      create index allocation_plan_bdgt_itms_alc_id_idx on allocation_plan_budget_items (allocation_plan_id);
    SQL
  end

  def down
    execute <<-SQL
      alter table budgets
        drop constraint user_foreign_key;
      drop index budgets_user_id_idx;

      alter table budget_categories
        drop constraint budget_id_foreign_key;
      drop index budget_id_idx;

      alter table budget_items
        drop constraint budget_category_foreign_key;
      drop index budget_items_category_idx;

      alter table budget_item_expenses
        drop constraint budget_item_foreign_key;
      drop index budget_item_expenses_item_idx;

      alter table annual_budgets
        drop constraint annual_user_foreign_key;
      drop index annual_budgets_user_id_idx;

      alter table annual_budget_items
        drop constraint annual_budget_foreign_key;
      drop index annual_budget_items_budget_id_idx;

      alter table allocation_plans
        drop constraint allocation_budget_foreign_key;
      drop index allocation_plans_budget_id_idx;

      alter table allocation_plan_budget_items
        drop constraint allocation_budget_itm_foreign_key;
      drop index allocation_plan_bdgt_itms_budget_id_idx;
      alter table allocation_plan_budget_items
        drop constraint allocation_pln_budget_foreign_key;
      drop index allocation_plan_bdgt_itms_alc_id_idx;
    SQL
  end
end

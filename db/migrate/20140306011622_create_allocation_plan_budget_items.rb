class CreateAllocationPlanBudgetItems < ActiveRecord::Migration
  def change
    create_table :allocation_plan_budget_items do |t|
      t.references :allocation_plan
      t.references :budget_item
      t.decimal    :amount_budgeted, precision: 10, scale: 2
      t.timestamps
    end
  end
end

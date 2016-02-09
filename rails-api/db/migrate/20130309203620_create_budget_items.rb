class CreateBudgetItems < ActiveRecord::Migration
  def change
    create_table :budget_items do |t|
      t.references :budget_category
      t.string :name
      t.decimal :amount_budgeted, :precision => 10, :scale => 2
      t.timestamps
    end
  end
end

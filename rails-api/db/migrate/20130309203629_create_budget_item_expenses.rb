class CreateBudgetItemExpenses < ActiveRecord::Migration
  def change
    create_table :budget_item_expenses do |t|
      t.references :budget_item
      t.string :name
      t.decimal :amount, :precision => 10, :scale => 2
      t.date :date
      t.timestamps
    end
  end
end

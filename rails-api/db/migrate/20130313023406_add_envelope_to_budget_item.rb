class AddEnvelopeToBudgetItem < ActiveRecord::Migration
  def change
    add_column :budget_items, :envelope, :boolean
  end
end

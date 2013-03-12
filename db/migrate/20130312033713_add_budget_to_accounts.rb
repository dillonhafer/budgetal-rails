class AddBudgetToAccounts < ActiveRecord::Migration
  def change
    add_column :budgets, :user_id, :integer
  end
end

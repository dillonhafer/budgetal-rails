class AddYearToBudgets < ActiveRecord::Migration
  def change
    add_column :budgets, :year, :string
    execute "UPDATE budgets SET year = '2013' WHERE created_at BETWEEN '2013-01-01' AND '2013-12-31' "
  end
end

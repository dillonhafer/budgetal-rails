class BudgetItem < ActiveRecord::Base
  belongs_to :budget_category  
  has_many :budget_item_expenses
  validates_presence_of :budget_category_id, :amount_budgeted, :name

  def past_expenses
    sql = <<-END_SQL
        SELECT budget_item_expenses.name
        FROM budgets
        JOIN budget_categories ON budget_categories.budget_id=budgets.id
        JOIN budget_items ON budget_items.budget_category_id=budget_categories.id
        JOIN budget_item_expenses ON budget_item_expenses.budget_item_id=budget_items.id
        WHERE budget_items.name = ?
        AND budgets.user_id = #{self.budget_category.budget.user_id}        
        GROUP BY budget_item_expenses.name
        HAVING (COUNT(budget_item_expenses.name) > 2)
    END_SQL

    expenses = BudgetItem.find_by_sql([sql, self.name])
    expenses_array = expenses.map {|e| e["name"]}
    expenses_array.unshift('Add a new item')
  end
end

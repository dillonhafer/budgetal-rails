class BudgetItem < ActiveRecord::Base
  attr_accessible :budget_category_id, :amount_budgeted, :name, :envelope
  belongs_to :budget_category  
  has_many :budget_item_expenses
  validates_presence_of :budget_category_id, :amount_budgeted, :name

  def past_expenses
    sql = <<-END_SQL
        SELECT budget_item_expenses.name
        FROM budgets
        JOIN budget_categories on budget_categories.budget_id=budgets.id
        JOIN budget_items on budget_items.budget_category_id=budget_categories.id
        JOIN budget_item_expenses on budget_item_expenses.budget_item_id=budget_items.id
        WHERE budget_items.name = ?
        AND budgets.user_id = #{self.budget_category.budget.user_id}
        -- Perhaps this is premature optimization
        -- AND budgets.created_at::date BETWEEN '#{Date.today}' AND '#{6.month.ago.to_date}'
        GROUP by budget_item_expenses.name
        HAVING (count(budget_item_expenses.name) > 3)
    END_SQL

    expenses = BudgetItem.find_by_sql([sql, self.name])
    expenses_array = expenses.map {|e| e["name"]}
    expenses_array.unshift('Add a new item')
  end
end

class BudgetItem < ActiveRecord::Base  
  belongs_to :budget_category  
  has_many :budget_item_expenses
  has_many :allocation_plan_budget_items
  accepts_nested_attributes_for :budget_item_expenses, allow_destroy: true
  validates_presence_of :budget_category_id, :amount_budgeted, :name

  default_scope -> { order(:id)}
  
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

  def amount_allocated
    allocation_plan_budget_items.sum(:amount_budgeted)
  end

  def remaining_allocations    
    amount_budgeted - amount_allocated
  end
end

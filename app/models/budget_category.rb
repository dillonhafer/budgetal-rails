class BudgetCategory < ActiveRecord::Base
  belongs_to :budget
  has_many :budget_items
  validates_presence_of :budget_id, :name, :percentage

   def total_spent    
    spent = ActiveRecord::Base.connection.select_all <<-END_SQL
      SELECT SUM(bie.amount)
      FROM budget_categories bc
      JOIN budget_items bi ON bi.budget_category_id=bc.id
      JOIN budget_item_expenses bie ON bie.budget_item_id=bi.id
      WHERE bc.id = #{id}
    END_SQL
    spent.first["sum"].to_f    
  end

  def budget_remaining
    self.budget_items.sum(:amount_budgeted) - self.total_spent
  end

  def percent_used
    percent = self.total_spent / self.budget_items.sum(:amount_budgeted) * 100
    percent > 100 ? 100 : percent
  end
end

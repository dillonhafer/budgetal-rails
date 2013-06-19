class BudgetCategory < ActiveRecord::Base
  attr_accessible :budget_id, :name, :percentage
  belongs_to :budget
  has_many :budget_items
  validates_presence_of :budget_id, :name, :percentage

   def total_spent
    total_spent = ActiveRecord::Base.connection.select_all <<-END_SQL
      SELECT SUM(bie.amount)
      FROM budget_categories bc
      JOIN budget_items bi ON bi.budget_category_id=bc.id
      JOIN budget_item_expenses bie ON bie.budget_item_id=bi.id
      WHERE bc.id = #{id}
    END_SQL
    total_spent.first["sum"].to_f
  end
end

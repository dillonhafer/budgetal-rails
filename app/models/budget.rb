class Budget < ActiveRecord::Base
  attr_accessible :monthly_income  
  attr_accessor :year

  belongs_to :user
  has_many :budget_categories
  has_many :budget_items, through: :budget_categories
  validates_presence_of :monthly_income

  scope :ordered, order('month::integer')

  def total_expenses
    total_expense = ActiveRecord::Base.connection.select_all <<-END_SQL
      SELECT SUM(bie.amount)
      FROM budgets b
      JOIN budget_categories bc ON bc.budget_id=b.id
      JOIN budget_items bi ON bi.budget_category_id=bc.id
      JOIN budget_item_expenses bie ON bie.budget_item_id=bi.id
      WHERE bc.id = #{id}
    END_SQL
    total_expense.first["sum"].to_f
  end

  def year
    2013
  end
end

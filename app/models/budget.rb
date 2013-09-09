class Budget < ActiveRecord::Base
  attr_accessible :monthly_income, :month, :year, :user_id  

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
      WHERE b.id = #{id}
    END_SQL
    total_expense.first["sum"].to_f
  end

  def difference
    monthly_income-total_expenses
  end

  def self.create_template(month, year, user_id)
    budget = Budget.create(month: month, year: year, user_id: user_id, monthly_income: '0.00')
    budget.budget_categories.create(name: 'Charity', percentage: '10-15%')
    budget.budget_categories.create(name: 'Saving', percentage: '10-15%')
    budget.budget_categories.create(name: 'Housing', percentage: '25-35%')
    budget.budget_categories.create(name: 'Utilities', percentage: '5-10%')
    budget.budget_categories.create(name: 'Food', percentage: '5-15%')
    budget.budget_categories.create(name: 'Clothing', percentage: '2-7%')
    budget.budget_categories.create(name: 'Transportation', percentage: '10-15%')
    budget.budget_categories.create(name: 'Medical/Health', percentage: '5-10%')
    budget.budget_categories.create(name: 'Insurance', percentage: '10-25%')
    budget.budget_categories.create(name: 'Personal', percentage: '5-10%')
    budget.budget_categories.create(name: 'Recreation', percentage: '5-10%')
    budget.budget_categories.create(name: 'Debts', percentage: '0%')
  end
end

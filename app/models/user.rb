class User < ActiveRecord::Base
  has_many :annual_budgets, dependent: :destroy
  has_many :annual_budget_items, through: :annual_budgets
  has_many :budgets, dependent: :destroy
  has_many :budget_categories, through: :budgets
  has_many :budget_items, through: :budget_categories
  has_many :budget_item_expenses, through: :budget_items
  has_many :allocation_plans, through: :budgets

  devise :database_authenticatable, :registerable, :timeoutable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :first_name, :last_name
  validates_presence_of :password, on: :create
  validates_confirmation_of :password, on: :create
  validates :email, presence: true, uniqueness: true, case_sensitive: false

  after_create :send_welcome_email

  def full_name
    "#{first_name} #{last_name}"
  end

  def past_expenses(name)
    budget_item_expenses.where("budget_item_expenses.name ilike ?", "#{name}%")
                        .distinct('name')
                        .reorder('budget_item_expenses.name')
                        .pluck('budget_item_expenses.name')
  end

  private

  def send_welcome_email
    Notifier.new_user(self).deliver_now
  end
end

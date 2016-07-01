class AnnualBudget < ApplicationRecord
  belongs_to :user
  has_many :annual_budget_items, dependent: :destroy
  validates_presence_of :user_id, :year
  validates_uniqueness_of :year, scope: :user_id
end

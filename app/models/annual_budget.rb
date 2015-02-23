class AnnualBudget < ActiveRecord::Base
  belongs_to :user
  has_many :annual_budget_items

  accepts_nested_attributes_for :annual_budget_items, allow_destroy: true

  validates_presence_of :user_id, :year
  validates_uniqueness_of :year, scope: :user_id
end

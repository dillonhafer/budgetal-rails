FactoryGirl.define do
  factory :budget do
    year            Date.today.year
    month           Date.today.month
    monthly_income  5000
  end

  trait :with_budget_items do
    after :create do |budget|
      category = FactoryGirl.create :budget_category, budget: budget
      FactoryGirl.create :budget_item, budget_category: category
    end
  end
end

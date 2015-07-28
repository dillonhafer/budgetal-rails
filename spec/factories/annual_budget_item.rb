FactoryGirl.define do
  factory :annual_budget_item do
    annual_budget
    name      'Insurrance'
    amount    '300'
    due_date  Date.today
  end
end

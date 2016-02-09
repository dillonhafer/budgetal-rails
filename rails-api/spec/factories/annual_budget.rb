FactoryGirl.define do
  factory :annual_budget do
    user
    year      Date.today.year
  end
end

FactoryGirl.define do
  factory :allocation_plan do
    budget
    income        {Faker::Number.decimal(2)}
    start_date    Date.yesterday
    end_date      Date.tomorrow
  end
end

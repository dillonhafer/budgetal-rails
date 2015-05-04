FactoryGirl.define do
  factory :user do
    email      {Faker::Internet.safe_email}
    first_name 'Luke'
    last_name  'Skywalker'
    password   'Secret123@'
  end
end

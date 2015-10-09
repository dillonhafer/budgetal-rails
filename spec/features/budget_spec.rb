require 'rails_helper'
require 'support/feature_helper'

feature "Budget navigation", :feature do
  scenario "A user can visit a budgets when they done exist" do
    user = login
    visit root_path
    expect(page).to have_content("Hello, #{user.first_name}!")
    click_link "Cash Flow Plans"
    expect(page).to have_selector('div[data-react-class="CashFlowPlan"]', count: 1)
  end
end

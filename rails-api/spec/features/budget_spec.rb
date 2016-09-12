require 'rails_helper'
require 'support/feature_helper'

feature "Budget navigation", :js do
  scenario "A user can visit a budgets when they done exist" do
    user = login
    visit root_path
    expect(page).to have_content("Hello, #{user.first_name}!")
    click_link 'Budgets'
    sleep 0.2
    expect(page).to have_selector('h3', text: 'MONTHLY OVERVIEW', count: 1)
  end
end

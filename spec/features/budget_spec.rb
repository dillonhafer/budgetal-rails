require 'rails_helper'

feature "Budget navigation", :feature do
  scenario "A user can visit a budgets when they done exist" do
    user = login
    visit root_path
    expect(page).to have_content("Hello, #{user.first_name}!")
    click_link "Cash Flow Plans"
    expect(page).to have_selector('.category-ajax', count: 1)
  end
end

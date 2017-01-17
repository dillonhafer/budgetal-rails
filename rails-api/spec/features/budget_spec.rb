require 'rails_helper'
require 'support/feature_helper'

feature "Budget navigation", :js do
  let(:budgets_page) { BudgetsPage.new }
  let(:home_page)    { HomePage.new }
  let(:nav_page)     { NavPage.new }

  scenario "A user visiting a budget creates a budget" do
    user = login
    home_page.visit_page
    expect(home_page).to be_on_page
    expect(nav_page).to be_signed_in_as(user.first_name)

    nav_page.click_budgets
    expect(budgets_page).to be_on_page
  end
end

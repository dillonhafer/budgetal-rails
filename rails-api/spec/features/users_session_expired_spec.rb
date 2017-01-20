require 'rails_helper'
require 'support/feature_helper'

feature "User's session expired", :js do
  let(:budgets_page) { Pages::BudgetsPage.new }
  let!(:user) { login }

  before(:each) do
    budgets_page.visit_page
  end

  it 'gets redirected on Update Budget' do
    expect(budgets_page).to be_on_page
    user.sessions.expire

    budgets_page.click_add_budget_item
    budgets_page.click_save
    assert_redirected
  end

  it 'gets redirected on Detailed Budgets' do
    expect(budgets_page).to be_on_page
    user.sessions.expire

    click_on 'Detailed Budgets'
    assert_redirected
  end

  it 'gets redirected on Annual Budgets' do
    expect(budgets_page).to be_on_page
    user.sessions.expire

    click_on 'Annual Budgets'
    assert_redirected
  end
end

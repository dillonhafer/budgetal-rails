require 'rails_helper'
require 'support/feature_helper'

feature 'User manages budgets', js: true do
  let(:month_names) { Date::MONTHNAMES }
  let(:budgets_page) { Pages::BudgetsPage.new }
  let(:income_modal) { Pages::BudgetIncomeModal.new }
  let(:next_month) { Date.today.advance(months: 1) }
  let(:next_year) { Date.today.year + 1 }

  context 'As a logged in user' do
    before do
      user = login
      user.budgets.create(year: next_month.year, month: next_month.month)
      user.budgets.create(year: next_year, month: Date.today.month)
      budgets_page.visit_page
    end

    scenario 'I can change monthly income' do
      budgets_page.click_edit_income
      expect(income_modal).to be_on_page

      income_modal.fill_in_income("1234.56")
      income_modal.click_save_income

      expect(budgets_page).to have_remaining_to_budget("$1,234.56")
    end

    scenario 'I can change budget categories' do
      budgets_page.click_sidebar_housing
      expect(budgets_page).to have_active_category("Housing")
    end

    scenario "I can view different month's budget" do
      budgets_page.change_month(next_month.strftime("%b"))
      expect(budgets_page).to be_on_month(next_month.strftime("%B"))
    end

    scenario "I can view different year's budget" do
      budgets_page.change_year(next_year)
      expect(budgets_page).to be_on_year(next_year)
    end
  end
end

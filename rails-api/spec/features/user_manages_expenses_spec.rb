require 'rails_helper'
require 'support/feature_helper'

feature 'User manages expenses', :js do
  let(:budgets_page) { Pages::BudgetsPage.new }
  let(:notice_modal) { Pages::NoticeModal.new }

  context 'As a logged in user' do
    let!(:user) { login }

    context 'With Budget Items' do
      let!(:budget) { FactoryGirl.create(:budget, :with_budget_items, user: user, month: Date.today.month, year: Date.today.year) }

      scenario 'I can add expenses' do
        budgets_page.visit_page
        expect(budgets_page).to be_on_page

        budgets_page.show_expenses
        expect(budgets_page).to be_missing_expenses

        budgets_page.click_add_expense
        budgets_page.fill_in_expense_name("Amazon")
        budgets_page.fill_in_expense_amount("3.00")
        budgets_page.click_save_expense

        expect(notice_modal).to have_notice "Saved Amazon"
        expect(budgets_page).not_to be_missing_expenses
      end

      context 'with an expense' do
        let!(:expense) { FactoryGirl.create(:budget_item_expense, budget_item: budget.budget_items.first) }

        before do
          budgets_page.visit_page
        end

        scenario 'I can edit an expense' do
          expect(budgets_page).to be_on_page
          budgets_page.show_expenses

          budgets_page.fill_in_expense_name("Donuts")
          budgets_page.fill_in_expense_amount("6.00")
          budgets_page.click_save_expense

          expect(notice_modal).to have_notice "Saved Donuts"
          expect(budgets_page).not_to be_missing_expenses
        end

        scenario 'I can delete an expense' do
          expect(budgets_page).to be_on_page
          budgets_page.show_expenses

          budgets_page.click_delete_expense(expense.name)
          expect(notice_modal).to have_notice "Deleted CC Gift"
          expect(budgets_page).to be_missing_expenses
        end

        scenario 'I can see predicted expenses' do
          expect(budgets_page).to be_on_page

          budgets_page.show_expenses
          budgets_page.fill_in_prediction(expense.name)
          budgets_page.click_predicted_expense(expense.name)
          budgets_page.click_save_expense

          expect(notice_modal).to have_notice expense.name
        end
      end
    end
  end
end

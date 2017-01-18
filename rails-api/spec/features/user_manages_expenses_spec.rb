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

        within '.ant-table' do
          budgets_page.click_add_expense
          budgets_page.fill_in_expense_name("Amazon")
          budgets_page.fill_in_expense_amount("3.00")
          budgets_page.click_save_expense
        end

        expect(notice_modal).to have_notice "Saved Amazon"
        expect(budgets_page).not_to be_missing_expenses
      end

      context 'with an expense' do
        let!(:expense) { FactoryGirl.create(:budget_item_expense, budget_item: budget.budget_items.first) }

        before do
          visit root_path
          click_link "Budgets"
          find('.show-expenses').click
        end

        scenario 'I can edit an expense' do
          within '.expense-list' do
            fill_in 'name', with: 'Donuts'
            fill_in 'amount', with: ''
            fill_in 'amount', with: '6'
            click_on 'Save'
          end
          expect(page).to have_selector '.flash-box', text: 'Saved Donuts'

          within '.expense-list' do
            expect(page).to have_field('name', with: 'Donuts')
            expect(page).to have_field('amount', with: '6.00')
            expect(page).not_to have_field('name', with: 'Amazon')
            expect(page).not_to have_field('amount', with: '3.00')
          end
        end

        scenario 'I can delete an expense' do
          within '.expense-list' do
            click_on 'Delete'
          end
          click_link "Delete #{expense.name}"
          expect(page).to have_content("You haven't added any expenses yet")
        end

        scenario 'I can see predicted expenses' do
          within '.expense-list' do
            fill_in 'name', with: expense.name[0,3]
          end

          within '.predicted-expenses' do
            click_on expense.name
          end
          expect(page).to have_field('name', with: expense.name)
        end
      end
    end
  end
end

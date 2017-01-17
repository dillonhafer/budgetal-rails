require 'rails_helper'
require 'support/feature_helper'

feature 'User manages expenses', js: true do
  let(:budgets_page) { Pages::Budgets.new }

  context 'As a logged in user' do
    let!(:user) { login }

    context 'With Budget Items' do
      let!(:budget) { FactoryGirl.create(:budget, :with_budget_items, user: user, month: Date.today.month, year: Date.today.year) }

      scenario 'I can add expenses' do
        visit root_path
        click_link "Budgets"

        # Add Expense
        find('.show-expenses').click
        expect(page).to have_content "You haven't added any expenses yet"
        within '.expense-list' do
          click_on 'Add an expense'
          expect(page).to have_selector('.input-calendar')
          find('.input-calendar').click
        end

        within('.input-calendar-wrapper') do
          expect(page).to have_selector '.day.today.cell'
          find('.day.today.cell').click()
        end

        within '.expense-list' do
          fill_in 'name', with: 'Amazon'
          fill_in 'amount', with: ''
          fill_in 'amount', with: '3'

          expect(page).to have_field('name', with: 'Amazon')
          click_on 'Save'
        end

        expect(page).not_to have_content "You haven't added any expenses yet"
        expect(page).to have_field('name', with: 'Amazon')
        expect(page).to have_field('amount', with: '3.00')
        expect(page).to have_selector '.flash-box', text: 'Saved Amazon'
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

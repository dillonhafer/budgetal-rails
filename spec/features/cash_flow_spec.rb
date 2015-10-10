require 'rails_helper'
require 'support/feature_helper'

feature 'Budgets', js: true do
  before(:each) do
    @user = login_with
    visit my_budgets_path(year: Date.today.year, month: Date.today.month)
  end

  context 'As a logged in user' do
    context 'Without any budgets' do
      it 'creates a budget' do
        expect(page).to have_content("You haven't added any budget items yet.")
      end
    end

    context 'with a budget' do
      it 'I can change my monthly income' do
        fill_in 'monthly_income', with: '1234.56'
        click_on 'Save Income'
        expect(page).to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'
        visit my_budgets_path(year: Date.today.year, month: Date.today.month)
        expect(page).to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'
      end

      it 'I can select a new budget category' do
        within '.icon-bar' do
          click_on 'Housing'
        end
        expect(page).to have_selector 'h3', text: 'HOUSING'
        expect(page).to have_selector 'h3', text: 'HOUSING OVERVIEW'
      end

      context 'I can view a different months budget' do
        it 'can view a different months budget' do
          click_on "#{Date.today.strftime("%B")} #{Date.today.year}"
          select 'February', from: 'budget_month'
          expect(page).to have_selector 'a', text: "Feburary #{Date.today.year}"
        end

        it 'can view a different years budget' do
          click_on "#{Date.today.strftime("%B")} #{Date.today.year}"
          select '2016', from: 'budget_year'
          expect(page).to have_selector 'a', text: "#{Date.today.strftime("%B")} 2016"
        end
      end

      it 'I can add/edit/delete a budget item' do
        expect(page).to have_content "You haven't added any budget items yet."
        expect(page).to have_selector 'h5', text: 'You have $4,000.00 Remaining to budget'
        click_on 'Add a budget item'
        fill_in 'name', with: 'Gifts'
        fill_in 'amount_budgeted', with: '3'
        click_on 'Save'
        expect(page).not_to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'

        visit my_budgets_path(year: Date.today.year, month: Date.today.month)
        expect(page).to have_field('name', with: 'Gifts')
        expect(page).to have_field('amount_budgeted', with: '3.00')
        fill_in 'name', with: 'Saver'
        fill_in 'amount_budgeted', with: '6'
        click_on 'Save'
        visit my_budgets_path(year: Date.today.year, month: Date.today.month)
        expect(page).to have_field('name', with: 'Saver')
        expect(page).to have_field('amount_budgeted', with: '6.00')

        click_on 'Delete'
        click_link 'Delete Saver'
        expect(page).to have_content("You haven't added any budget items yet.")
      end

      it 'I can add a budget item expense' do
        create_budget_item
        create_expense
      end

      it 'I can edit a budget item expense' do
        create_budget_item
        create_expense

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
        end
      end

      it 'I can delete a budget item expense' do
        create_budget_item
        create_expense
        within '.expense-list' do
          click_on 'Delete'
        end

        click_link "Delete Amazon"
        expect(page).to have_content("You haven't added any expenses yet")
      end

      it 'I can use the autocomplete list to add an expense' do
        budget = FactoryGirl.create(:budget, :with_budget_items, user: @user)
        FactoryGirl.create(:budget_item_expense, budget_item: budget.budget_items.first)
        FactoryGirl.create(:budget_item_expense, budget_item: budget.budget_items.first)
        create_budget_item
        create_expense

        within '.expense-list' do
          fill_in 'name', with: 'ama'

          within '.predicted-expenses' do
            click_on 'Amazon'
          end

          expect(page).to have_field('name', with: 'Amazon')
        end
      end
    end
  end
end

def create_budget_item
  expect(page).to have_content "You haven't added any budget items yet."
  expect(page).to have_selector 'h5', text: 'You have $4,000.00 Remaining to budget'
  click_on 'Add a budget item'
  fill_in 'name', with: 'Gifts'
  fill_in 'amount_budgeted', with: '3'
  click_on 'Save'
  expect(page).to have_selector '.flash-box', text: 'Saved Gifts'
  expect(page).not_to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'
end

def create_expense
  find('.show-expenses').click
  within '.expense-list' do
    click_on 'Add an expense'
    find('.get-date').click
  end

  within('#minical_calendar_0') do
    expect(page).to have_selector 'a', text: '25'
    click_link '25'
  end

  within '.expense-list' do
    fill_in 'name', with: 'Amazon'
    fill_in 'amount', with: '3'
    click_on 'Save'
  end
  expect(page).to have_field('name', with: 'Amazon')
  expect(page).to have_field('amount', with: '3.00')
  expect(page).to have_selector '.flash-box', text: 'Saved Amazon'
end
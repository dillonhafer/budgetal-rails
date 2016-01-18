require 'rails_helper'
require 'support/feature_helper'

feature 'Cash Flow Plans', js: true do
  context 'As a logged in user' do
    it 'can add/edit/delete budget_items and expenses' do
      login
      visit root_path
      find('[title="this is you!"]').click
      click_link "Cash Flow Plans"

      # It creates a budget
      expect(page).to have_content("You haven't added any budget items yet.")

      # I can change my monthly income
      fill_in 'monthly_income', with: ''
      fill_in 'monthly_income', with: '1234.56'
      click_on 'Save Income'
      expect(page).to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'

      # I can select a new budget category
      within '.icon-bar' do
        click_on 'Housing'
      end
      expect(page).to have_selector 'h3', text: 'HOUSING'
      expect(page).to have_selector 'h3', text: 'HOUSING OVERVIEW'

      # I can view a different months budget
      find('a.item.header').click
      select 'February', from: 'budget_month'
      expect(page).to have_selector 'a', text: "February #{Date.today.year}"

      # I can view a different years budget
      find('a.item.header').click
      next_year = Date.today.year + 1
      select next_year, from: 'budget_year'
      expect(page).to have_selector 'a', text: "February #{next_year}"

      # Add/Edit/Delete a budget item
      # Add Budget Item
      expect(page).to have_content "You haven't added any budget items yet."
      expect(page).to have_selector 'h5', text: 'You have $4,000.00 Remaining to budget'
      click_on 'Add a budget item'
      fill_in 'name', with: 'Gifts'
      fill_in 'amount_budgeted', with: '3'
      click_on 'Save'
      expect(page).to have_content("Saved Gifts")
      expect(page).to have_field('name', with: 'Gifts')
      expect(page).to have_field('amount_budgeted', with: '3.00')
      expect(page).not_to have_content "You haven't added any budget items yet."
      expect(page).not_to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'

      # Edit Budget Item
      fill_in 'name', with: 'Saver'
      fill_in 'amount_budgeted', with: '6'
      click_on 'Save'
      expect(page).to have_field('name', with: 'Saver')
      expect(page).to_not have_field('name', with: 'Gifts')
      expect(page).to have_field('amount_budgeted', with: '6.00')
      expect(page).to_not have_field('amount_budgeted', with: '3.00')
      expect(page).to have_content("Saved Saver")
      expect(page).not_to have_content "You haven't added any budget items yet."
      expect(page).not_to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'

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

      # Predicted expense name list
      within '.expense-list' do
        fill_in 'name', with: 'Amazon'
      end

      within '.predicted-expenses' do
        click_on 'Amazon'
      end

      expect(page).not_to have_content "You haven't added any expenses yet"
      expect(page).to have_field('name', with: 'Amazon')
      expect(page).to have_field('amount', with: '3.00')
      expect(page).to have_selector '.flash-box', text: 'Saved Amazon'

      # Edit Expense
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

      # Delete Expense
      within '.expense-list' do
        click_on 'Delete'
      end
      click_link "Delete Donuts"
      expect(page).to have_content("You haven't added any expenses yet")

      # Delete Budget Item
      first('.flash-box').click
      click_on 'Delete'
      click_link 'Delete Saver'
      expect(page).to have_content("You haven't added any budget items yet.")
    end
  end
end

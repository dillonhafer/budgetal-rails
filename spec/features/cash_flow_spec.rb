require 'rails_helper'

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
        fill_in 'Monthly Income', with: '1234.56'
        click_on 'Update Monthly Income'
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

      it 'I can add a budget item' do
        expect(page).to have_content "You haven't added any budget items yet."
        expect(page).to have_selector 'h5', text: 'You have $4,000.00 Remaining to budget'
        click_on 'Add a budget item'
        fill_in 'name', with: 'Gifts'
        fill_in 'amount_budgeted', with: '300.00'
        click_link 'save'
        expect(page).not_to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'
        visit my_budgets_path(year: Date.today.year, month: Date.today.month)
        expect(page).to have_selector '.budget-item-name', text: 'Gifts'
        expect(page).to have_selector '.budget-item-amount-budgeted', text: '300'
      end
    end
  end
end

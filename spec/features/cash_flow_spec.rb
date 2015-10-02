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

      xit 'I can add a budget item' do
        click_on 'Add Item'
        fill_in 'name', with: 'Insurrance'
        fill_in 'amount', with: '300'
        find('.get-date').click
        within('#minical_calendar_0') do
          expect(page).to have_selector 'a', text: '25'
          click_link '25'
        end
        click_link 'save'
        visit annual_budgets_path(year: Date.today.year)
        expect(page).to have_content("Insurrance")
      end
    end
  end
end

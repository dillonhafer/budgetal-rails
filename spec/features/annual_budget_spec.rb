require 'rails_helper'
require 'support/feature_helper'

feature 'Annual Budgets', js: true do
  before(:each) do
    @user = login_with
    visit annual_budgets_path(year: Date.today.year)
  end

  context 'As a logged in user' do
    context 'Without any annual budgets' do
      it 'I see that I have no budget items' do
        expect(page).to have_content("You haven't added any budget items yet.")
      end

      it 'I can add a budget item' do
        click_on 'Add an Item'
        fill_in 'name', with: 'Insurrance'
        fill_in 'amount', with: '300'
        find('.get-date').click
        within('#minical_calendar_0') do
          expect(page).to have_selector 'a', text: '25'
          click_link '25'
        end
        click_on 'Save'
        visit annual_budgets_path(year: Date.today.year)
        expect(page).to have_content("Insurrance")
      end
    end

    context 'With an annual budget' do
      before(:each) do
        @budget = @user.annual_budgets.first
        @item = FactoryGirl.create(:annual_budget_item, annual_budget: @budget)
        visit annual_budgets_path(year: Date.today.year)
      end

      it 'can update the item' do
        fill_in 'name', with: 'Gas'
        fill_in 'amount', with: '600'
        find('.get-date').click
        within('#minical_calendar_0') do
          expect(page).to have_selector 'a', text: '25'
          click_link '25'
        end
        click_on 'Save'
        visit annual_budgets_path(year: Date.today.year)
        expect(page).to have_content("Gas")
        expect(page).not_to have_content(@item.name)
      end

      it 'can delete the item' do
        expect(page).to have_content(@item.name)
        click_link 'Delete'
        click_link "Delete #{@item.name}"
        expect(page).to have_content("You haven't added any budget items yet.")
      end
    end
  end
end

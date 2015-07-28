require 'rails_helper'

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
        click_on 'Add Item'
        fill_in 'name', with: 'Insurrance'
        fill_in 'amount', with: '300'
        fill_in 'due_date', with: '2015-12-12'
        find('.picker__box').click
        click_link 'save'
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
        fill_in 'due_date', with: '2015-12-20'
        find('.picker__box').click
        click_link 'save'
        visit annual_budgets_path(year: Date.today.year)
        expect(page).to have_content("Gas")
        expect(page).not_to have_content(@item.name)
      end

      it 'can delete the item' do
        expect(page).to have_content(@item.name)
        click_link 'delete'
        page.driver.browser.switch_to.alert.accept
        expect(page).to have_content("You haven't added any budget items yet.")
      end
    end
  end
end

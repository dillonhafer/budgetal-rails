require 'rails_helper'
require 'support/feature_helper'

feature 'User manages budget items', :js do
  let(:budgets_page) { Pages::BudgetsPage.new }
  let(:notice_modal) { Pages::NoticeModal.new }

  context 'As a logged in user' do
    context 'I can manage budget items' do
      scenario 'I can add budget items' do
        login
        budgets_page.visit_page
        expect(budgets_page).to be_on_page

        budgets_page.click_add_budget_item
        budgets_page.fill_in_name("Gifts")
        budgets_page.fill_in_amount_budgeted("3.00")
        budgets_page.click_save

        expect(notice_modal).to have_notice("Saved Gifts")
        expect(page).to have_field('name', with: 'Gifts')
        expect(page).to have_field('amount_budgeted', with: '3.00')
        expect(budgets_page).not_to have_empty_message
      end

      scenario 'I can edit a budget item' do
        user = login
        FactoryGirl.create(:budget, :with_budget_items, user: user, month: Date.today.month, year: Date.today.year)
        visit root_path
        click_link "Budgets"

        find('input[name=name]', wait: 1)
        fill_in 'name', with: 'Saver'
        fill_in 'amount_budgeted', with: '6'
        click_on 'Save'
        expect(page).to have_field('name', with: 'Saver')
        expect(page).to_not have_field('name', with: 'Gifts')
        expect(page).to have_field('amount_budgeted', with: '6.00')
        expect(page).to_not have_field('amount_budgeted', with: '3.00')
        expect(page).to have_content("Saved Saver")
      end

      scenario 'I can delete a budget item' do
        user = login
        FactoryGirl.create(:budget, :with_budget_items, user: user, month: Date.today.month, year: Date.today.year)
        visit root_path
        click_link "Budgets"

        find('a', text: 'Delete', wait: 1)
        click_on 'Delete'
        click_link 'Delete My Organization'
        expect(page).to have_content("You haven't added any budget items yet.")
      end
    end

    context 'I can import previous budget items' do
      let(:previous_date) { Date.today.advance(months: -1) }
      let!(:user) { login }

      scenario 'can import previous budget items' do
        FactoryGirl.create(:budget, :with_budget_items, user: user, month: previous_date.month, year: previous_date.year)
        expect(BudgetItem.first.budget_category.budget.month).to eq previous_date.month
        budgets_page.import_items
        expect(page).to have_selector('.flash-box', text: 'Finished importing 1 item')
      end

      scenario 'can import multiple previous budget items' do
        FactoryGirl.create(:budget, :with_multiple_budget_items, user: user, month: previous_date.month, year: previous_date.year)
        budgets_page.import_items
        find('.flash-box', wait: 1)
        expect(page).to have_selector('.flash-box', text: 'Finished importing 2 items')
      end

      scenario 'can import nothing from the previous budget' do
        budgets_page.import_items
        find('.flash-box', wait: 1)
        expect(page).to have_selector('.flash-box', text: "There wasn't anything to import.")
      end
    end

    context 'And my session expired' do
      before(:each) do
        user = login
        visit root_path
        click_on "Budgets"
        sleep 0.3
        user.sessions.expire
      end

      scenario 'importing gets redirected' do
        find('.fi-download').click
        click_on 'Import Charity'
        assert_redirected
      end

      scenario 'saving gets redirected' do
        click_on 'Add a Budget Item'
        fill_in 'name', with: 'Gifts'
        fill_in 'amount_budgeted', with: '3'
        click_on 'Save'
        assert_redirected
      end
    end
  end
end

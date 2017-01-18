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
        expect(budgets_page).to have_item("Gifts")
        expect(budgets_page).to have_item_amount("3.00")
        expect(budgets_page).not_to have_empty_message
      end

      scenario 'I can edit a budget item' do
        user = login
        FactoryGirl.create(:budget, :with_budget_items, user: user, month: Date.today.month, year: Date.today.year)
        budgets_page.visit_page
        expect(budgets_page).to be_on_page

        budgets_page.fill_in_name("Saver")
        budgets_page.fill_in_amount_budgeted("6.00")
        budgets_page.click_save

        expect(notice_modal).to have_notice("Saved Saver")
        expect(budgets_page).to have_item("Saver")
        expect(budgets_page).not_to have_item("Gifts")
        expect(budgets_page).to have_item_amount("6.00")
      end

      scenario 'I can delete a budget item' do
        user = login
        FactoryGirl.create(:budget, :with_budget_items, user: user, month: Date.today.month, year: Date.today.year)
        budgets_page.visit_page
        expect(budgets_page).to be_on_page

        budgets_page.click_delete
        budgets_page.confirm_delete
        expect(notice_modal).to have_notice("Deleted My Organization")
        expect(budgets_page).to have_empty_message
      end
    end

    context 'I can import previous budget items' do
      let(:previous_date) { Date.today.advance(months: -1) }

      scenario 'can import previous budget items' do
        user = login
        FactoryGirl.create(:budget, :with_budget_items, user: user, month: previous_date.month, year: previous_date.year)

        budgets_page.visit_page
        expect(budgets_page).to be_on_page
        expect(budgets_page).to have_empty_message

        budgets_page.click_import_items
        expect(notice_modal).to have_notice("Finished importing 1 item")
      end

      scenario 'can import multiple previous budget items' do
        user = login
        FactoryGirl.create(:budget, :with_multiple_budget_items, user: user, month: previous_date.month, year: previous_date.year)
        budgets_page.visit_page
        expect(budgets_page).to be_on_page
        expect(budgets_page).to have_empty_message

        budgets_page.click_import_items
        expect(notice_modal).to have_notice("Finished importing 2 items")
      end

      scenario 'can import nothing from the previous budget' do
        user = login
        budgets_page.visit_page
        expect(budgets_page).to be_on_page
        budgets_page.click_import_items
        expect(notice_modal).to have_notice("There wasn't anything to import.")
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
        budgets_page.click_import_items
        assert_redirected
      end

      scenario 'saving gets redirected' do
        budgets_page.click_add_budget_item
        budgets_page.fill_in_name("Gifts")
        budgets_page.fill_in_amount_budgeted("3")
        budgets_page.click_save
        assert_redirected
      end
    end
  end
end

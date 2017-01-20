require 'rails_helper'
require 'support/feature_helper'

feature 'Annual Budgets', :js do
  context 'As a logged in user' do
    context 'Without any annual budgets' do
      let(:annual_budget) { FactoryGirl.create(:annual_budget, year: Date.today.year, user: user) }
      let(:annual_budgets_page) { Pages::AnnualBudgets.new }
      let(:annual_budget_modal) { Pages::AnnualBudgetModal.new }
      let(:notice_modal) { Pages::NoticeModal.new }
      let!(:user) { login }
      let(:item) do
        FactoryGirl.create(:annual_budget_item,
                           annual_budget: annual_budget,
                           name: 'Amazon',
                           amount: '80.00')
      end

      scenario 'I can add an annual budget item' do
        annual_budgets_page.visit_page
        expect(annual_budgets_page).to be_on_page

        expect(annual_budgets_page).to have_empty_message
        annual_budgets_page.click_add_item

        expect(annual_budget_modal).to be_on_page
        annual_budget_modal.fill_in_name("Insurance")
        annual_budget_modal.fill_in_amount("3")
        annual_budget_modal.click_save_item

        expect(notice_modal).to have_notice("Saved Insurance")
        expect(annual_budgets_page).to have_item("Insurance")
      end

      scenario 'I can edit an annual budget item' do
        item
        annual_budgets_page.visit_page
        expect(annual_budgets_page).to be_on_page

        expect(annual_budgets_page).to have_item("Amazon")
        expect(annual_budgets_page).to have_item_amount("$80.00")
        annual_budgets_page.click_edit("Amazon")

        expect(annual_budget_modal).to be_on_page
        annual_budget_modal.fill_in_name("Insurance")
        annual_budget_modal.fill_in_amount("99")
        annual_budget_modal.click_save_item
        expect(notice_modal).to have_notice("Saved Insurance")

        expect(annual_budgets_page).to have_item("Insurance")
        expect(annual_budgets_page).to have_item_amount("$99.00")
        expect(annual_budgets_page).not_to have_item("Amazon")
      end

      scenario 'I can delete an annual budget item' do
        item
        annual_budgets_page.visit_page
        expect(annual_budgets_page).to be_on_page

        expect(annual_budgets_page).to have_item("Amazon")
        annual_budgets_page.click_delete("Amazon")
        annual_budgets_page.click_delete_confirmation("Amazon")

        expect(notice_modal).to have_notice("Deleted Amazon")
        expect(annual_budgets_page).to have_empty_message
      end
    end
  end
end


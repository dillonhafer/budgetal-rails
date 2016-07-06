require 'rails_helper'
require 'support/feature_helper'
require 'support/pages/annual_budgets'

feature 'Annual Budgets', :js do
  context 'As a logged in user' do
    context 'Without any annual budgets' do
      let(:annual_budget) { FactoryGirl.create(:annual_budget, year: Date.today.year, user: user) }
      let(:annual_budgets_page) { Pages::AnnualBudgets.new }
      let!(:user) { login }

      scenario 'I can add an annual budget item' do
        visit root_path
        click_link "Annual Budgets"
        expect(page).to have_content("You haven't added any budget items yet.")
        click_on 'Add an Item'
        annual_budgets_page.edit_form_with(name: "Insurrance", amount: "3.00")
      end

      scenario 'I can edit an annual budget item' do
        item = FactoryGirl.create(:annual_budget_item, annual_budget: annual_budget, name: 'Amazon', amount: '80.00')
        visit root_path
        click_link "Annual Budgets"
        expect(page).to have_field("amount", with: "80.00")
        expect(page).to have_field("name", with: "Amazon")

        annual_budgets_page.edit_form_with(name: "Amazon Prime", amount: "100.00")

        expect(page).not_to have_field("amount", with: "80.00")
        expect(page).not_to have_field("name", with: "Amazon")
      end

      scenario 'I can delete an annual budget item' do
        item = FactoryGirl.create(:annual_budget_item, annual_budget: annual_budget, name: 'Insurance', amount: '80.00')
        visit root_path
        click_link "Annual Budgets"

        click_link "Delete"
        click_link "Delete Insurance"
        expect(page).to have_content("Deleted Insurance")
        expect(page).to have_content("You haven't added any budget items yet.")
      end
    end
  end
end


require 'rails_helper'
require 'support/feature_helper'

feature 'User manages budgets', js: true do
  let(:month_names) { Date::MONTHNAMES }

  context 'As a logged in user' do
    before do
      login
      visit root_path
      click_link "Budgets"
      sleep 1
    end

    scenario 'I can change monthly income' do
      fill_in 'monthly_income', with: ''
      fill_in 'monthly_income', with: '1234.56'
      click_on 'Save Income'
      expect(page).to have_selector 'h5', text: 'You have $1,234.56 Remaining to budget'
    end

    scenario 'I can change budget categories' do
      click_on 'Housing'
      expect(page).to have_selector 'h3', text: 'HOUSING'
      expect(page).to have_selector 'h3', text: 'HOUSING OVERVIEW'
    end

    scenario "I can view different month's budget" do
      month = month_names[Date.today.advance(months: 1).month]
      find('a.item.header').click
      select month, from: 'budget_month'
      expect(page).to have_selector 'a', text: "#{month} #{Date.today.year}"
    end

    scenario "I can view different year's budget" do
      month = month_names[Date.today.month]
      find('a.item.header').click
      next_year = Date.today.year + 1
      select next_year, from: 'budget_year'
      expect(page).to have_selector 'a', text: "#{month} #{next_year}"
    end
  end
end

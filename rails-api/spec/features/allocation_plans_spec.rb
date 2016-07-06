require 'rails_helper'
require 'support/feature_helper'
require 'support/pages/allocation_plans'

feature 'Allocation Plans', js: true do
  let(:allocation_plans_page) { Pages::AllocationPlans.new }
  context 'As a logged in user' do
    let!(:user) { login }
    context 'Without any allocation plans' do
      scenario 'I can add a pay period' do
        visit root_path
        click_on 'Detailed Budgets'
        expect(page).to have_content("You haven't added any pay periods yet.")
        click_on 'New Pay Period'
        allocation_plans_page.fill_in_pay_period(income: '300.00')
      end
    end

    context 'With allocation plans' do
      let(:budget) { FactoryGirl.create(:budget, user: user, month: Date.today.month, year: Date.today.year) }
      let!(:allocation_plan) { FactoryGirl.create(:allocation_plan, budget: budget, income: '400.00') }

      before do
        visit root_path
        click_on 'Detailed Budgets'
        expect(page).to have_selector('.pay-period-income', text: '$400.00')
      end

      scenario 'I can update a pay period' do
        find('.fi-pencil').click
        allocation_plans_page.fill_in_pay_period(income: '500.00')
      end

      scenario 'I can delete a pay period' do
        allocation_plans_page.delete_pay_period
      end
    end
  end
end

require 'rails_helper'
require 'support/feature_helper'

feature 'Allocation Plans', js: true do
  let(:plans_page) { Pages::AllocationPlans.new }
  let(:plan_modal) { Pages::AllocationPlanModal.new }
  let(:notice_modal) { Pages::NoticeModal.new }

  context 'As a logged in user' do
    let!(:user) { login }

    context 'Without any allocation plans' do
      scenario 'I can add a pay period' do
        plans_page.visit_page
        expect(plans_page).to have_empty_message

        plans_page.click_new_pay_period

        expect(plan_modal).to be_on_page
        plan_modal.fill_in_income("300")
        plan_modal.click_save

        expect(notice_modal).to have_notice("Saved Pay Period")
        expect(plans_page).not_to have_empty_message
      end
    end

    context 'With allocation plans' do
      let(:budget) { FactoryGirl.create(:budget, user: user, month: Date.today.month, year: Date.today.year) }
      let!(:allocation_plan) { FactoryGirl.create(:allocation_plan, budget: budget, income: '400.00') }

      before do
        plans_page.visit_page
      end

      scenario 'I can update a pay period' do
        expect(plans_page).to be_on_page
        expect(plans_page).to have_overview_income("$400.00")
        plans_page.click_edit

        expect(plan_modal).to be_on_page
        plan_modal.fill_in_income("300")
        plan_modal.click_save

        expect(notice_modal).to have_notice("Saved Pay Period")
        expect(plans_page).to have_overview_income("$300.00")
      end

      scenario 'I can delete a pay period' do
        expect(plans_page).to be_on_page
        expect(plans_page).to have_overview_income("$400.00")
        plans_page.click_delete

        expect(notice_modal).to have_notice("Pay Period Deleted")
        expect(plans_page).to have_empty_message
      end
    end
  end
end

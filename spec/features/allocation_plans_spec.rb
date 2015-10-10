require 'rails_helper'
require 'support/feature_helper'

feature 'Annual Budgets', js: true do
  before(:each) do
    @user = login_with
    visit root_path
    click_on "Hello, #{@user.first_name}!"
    click_on 'Allocated Spending Plans'
  end

  context 'As a logged in user' do
    context 'Without any allocation plans' do
      it 'I see that I have no pay periods' do
        expect(page).to have_content("You don't have any pay periods.")
      end

      it 'I can add a pay period' do
        click_on 'New Pay Period'
        fill_in 'Income', with: '300'

        find('#allocation_plan_start_date').click
        within('#minical_calendar_0') do
          expect(page).to have_selector 'a', text: '25'
          click_link '25'
        end

        find('#allocation_plan_end_date').click
        within('#minical_calendar_1') do
          expect(page).to have_selector 'a', text: '25'
          click_link '26'
        end

        click_on 'Add Pay Period'
        expect(page).to have_selector('.pay-period-income', text: '$300.00')

        # Edit
        find('.fi-pencil').click
        fill_in 'Income', with: ''
        fill_in 'Income', with: '400'
        click_on 'Update Pay Period'
        click_on 'Update Pay Period'
        expect(page).to have_selector('.pay-period-income', text: '$400.00')
      end
    end
  end
end

require 'rails_helper'
require 'support/feature_helper'

feature 'Allocation Plans', js: true do
  context 'As a logged in user' do
    context 'Without any allocation plans' do
      it 'I can add/update a pay period' do
        user = login_with
        visit root_path
        click_on "Hello, #{user.first_name}!"
        click_on 'Allocated Spending Plans'

        # I see that I have no pay periods
        expect(page).to have_content("You haven't added any pay periods yet.")
        expect(page).to have_selector('.pay-period-income', text: '$0.00')
        click_on 'New Pay Period'
        fill_in 'Pay Period Income', with: '300'

        first('fieldset').click
        within('.input-calendar-wrapper') do
          expect(page).to have_selector '.day.today.cell'
          find('.day.today.cell').click()
        end

        sleep 1
        click_on 'Save'
        expect(page).to have_selector('.pay-period-income', text: '$300.00')

        # Update
        find('.fi-pencil').click
        fill_in 'Income', with: ''
        fill_in 'Income', with: '400'
        click_on 'Save'
        expect(page).to have_selector('.pay-period-income', text: '$400.00')
      end
    end
  end
end

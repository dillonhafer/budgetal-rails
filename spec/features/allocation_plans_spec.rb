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
        fill_in 'income', with: '300'

        within('.start-date') do
          expect(page).to have_selector('fieldset')
          find('fieldset').click
          within('.input-calendar-wrapper') do
            expect(page).to have_selector '.day.today.cell'
            find('.day.today.cell').click()
          end
        end

        within('.end-date') do
          expect(page).to have_selector('fieldset')
          find('fieldset').click
          within('.input-calendar-wrapper') do
            expect(page).to have_selector '.day.today.cell'
            find('.day.today.cell').click()
          end
        end

        click_on 'Save'
        expect(page).to have_selector('.flash-box', text: 'Saved Plan')
        expect(page).to have_selector('.pay-period-income', text: '$300.00')

        # Update
        find('.fi-pencil').click
        fill_in 'income', with: ''
        fill_in 'income', with: '400'
        click_on 'Save'
        expect(page).to have_selector('.flash-box', text: 'Saved Plan')
        expect(page).to have_selector('.pay-period-income', text: '$400.00')
      end
    end
  end
end

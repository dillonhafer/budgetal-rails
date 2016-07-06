module Pages
  class AllocationPlans
    include Capybara::DSL
    include RSpec::Matchers

    def fill_in_pay_period(income:)
      expect(page).to have_selector('.overlay.fadeIn')
      fill_in 'income', with: income
      expect(page).to have_field('income', with: income)

      within('.start-date') do
        expect(page).to have_selector('.input-calendar')
        find('.input-calendar').click
        within('.input-calendar-wrapper') do
          expect(page).to have_selector '.day.today.cell'
          find('.day.today.cell').click()
        end
      end

      within('.end-date') do
        expect(page).to have_selector('.input-calendar')
        find('.input-calendar').click
        within('.input-calendar-wrapper') do
          expect(page).to have_selector '.day.today.cell'
          find('.day.today.cell').click()
        end
      end
      click_on 'Save'

      expect(page).to have_selector('.flash-box', text: 'Saved Pay Period')
      expect(page).to have_selector('.pay-period-income', text: income)
    end

    def delete_pay_period
      find('.fi-trash').click
      expect(page).to have_selector('#content-settings-overlay-confirm')
      find('#content-settings-overlay-confirm').click
      expect(page).to have_selector('.flash-box', text: 'Pay Period Deleted')
    end
  end
end


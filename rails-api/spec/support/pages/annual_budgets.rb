module Pages
  class AnnualBudgets
    include Capybara::DSL
    include RSpec::Matchers

    def edit_form_with(name:,amount:)
      fill_in 'name', with: name
      fill_in 'amount', with: amount
      expect(page).to have_selector('.input-calendar')
      find('.input-calendar').click
      within('.input-calendar-wrapper') do
        expect(page).to have_selector '.day.today.cell'
        find('.day.today.cell').click()
      end
      click_on 'Save'

      expect(page).to have_field('amount', with: amount)
      expect(page).to have_content("Saved #{name}")
      expect(page).to have_field('name', with: name)
    end
  end
end

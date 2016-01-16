require 'rails_helper'
require 'support/feature_helper'

feature 'Annual Budgets', :js do
  context 'As a logged in user' do
    context 'Without any annual budgets' do
      it 'I can add/edit/delete a budget item' do
        login_with
        visit root_path
        find('[title="this is you!"]').click
        click_link "Annual Budgets"

        # I have no budget items
        expect(page).to have_content("You haven't added any budget items yet.")

        # Add the item
        click_on 'Add an Item'
        edit_form_with(name: 'Insurrance', amount: '300')
        expect(page).to have_field('amount', with: '3.00')
        expect(page).to have_content("Saved Insurrance")
        expect(page).to have_field('name', with: 'Insurrance')

        # Edit the item
        edit_form_with(name: 'Gas', amount: '600')
        expect(page).to have_field('amount', with: '6.00')
        expect(page).to have_field('name', with: 'Gas')
        expect(page).to have_content("Saved Gas")

        expect(page).not_to have_field('amount', with: '3.00')
        expect(page).not_to have_field('name', with: 'Insurrance')

        # Delete the item
        click_link 'Delete'
        click_link "Delete Gas"
        expect(page).to have_content("Deleted Gas")
        expect(page).to have_content("You haven't added any budget items yet.")
      end
    end
  end
end

def edit_form_with(name:,amount:)
  fill_in 'name', with: name
  fill_in 'amount', with: amount
  find('fieldset').click
  within('.input-calendar-wrapper') do
    expect(page).to have_selector '.day.today.cell'
    find('.day.today.cell').click()
  end
  click_on 'Save'
end

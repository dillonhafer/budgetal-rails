require 'rails_helper'
require 'support/feature_helper'

feature "Budget navigation", :feature, :js do
  scenario "A user can visit a budgets when they done exist" do
    user = login
    visit root_path
    expect(page).to have_content("Hello, #{user.first_name}!")
    find('[title="this is you!"]').click
    click_link "Cash Flow Plans"
    expect(page).to have_selector('h3', text: 'MONTHLY OVERVIEW', count: 1)
  end
end

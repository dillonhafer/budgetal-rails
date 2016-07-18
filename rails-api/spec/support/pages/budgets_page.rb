module Pages
  class Budgets
    include Capybara::DSL
    include RSpec::Matchers

    def import_items
      visit '/'
      click_link "Budgets"
      find('.fi-download').click
      click_on 'Import Charity'
    end
  end
end

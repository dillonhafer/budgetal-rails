module Pages
  class AnnualBudgets
    include Capybara::DSL
    include RSpec::Matchers
    include Rails.application.routes.url_helpers

    def visit_page
      visit root_path
      click_link "Annual Budgets"
    end

    def on_page?
      has_selector? "h3", text: "ANNUAL BUDGET FOR #{Date.today.year}"
    end

    def has_empty_message?
      has_selector? ".body-row", text: "You haven't added any budget items yet."
    end

    def click_add_item
      click_on "Add an Item"
    end

    def has_item?(name)
      has_selector? "h3.ant-card-head-title", text: name
    end

    def has_item_amount?(amount)
      has_selector? ".ant-card-body b", text: amount
    end

    def click_edit(name)
      header = find(".ant-card-head-title", text: name).find(:xpath, '../..')
      header.find(".annual-item-crud button").click
      find(".ant-dropdown-menu-item a", text: "Edit").click
    end

    def click_delete(name)
      header = find(".ant-card-head-title", text: name).find(:xpath, '../..')
      header.find(".annual-item-crud button").click
      find(".ant-dropdown-menu-item a", text: "Delete").click
    end

    def click_delete_confirmation(name)
      find(".ant-confirm-body-wrapper button", text: "Delete #{name}").click
    end
  end

  class AnnualBudgetModal
    include Capybara::DSL

    def on_page?
      has_selector? ".ant-modal-header", text: "Annual Budget Item"
    end

    def fill_in_name(val)
      fill_in 'name', with: ""
      fill_in 'name', with: val
    end

    def fill_in_amount(val)
      fill_in 'amount', with: ""
      fill_in 'amount', with: val
    end

    def click_save_item
      click_on "Save Item"
    end
  end
end

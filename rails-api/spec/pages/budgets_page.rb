module Pages
  class BudgetsPage < PageObject
    def visit_page
      visit root_path
      click_on "Budgets"
    end

    def on_page?
      has_selector? ".ant-menu-item-selected", text: "Budgets"
    end

    def has_empty_message?
      has_selector? ".main-budget-categories", text: "You haven't added any budget items yet."
    end

    def has_remaining_to_budget?(amount)
      has_selector? 'p', text: "You still need to budget #{amount}"
    end

    def has_item?(name)
      has_selector? ".ant-tabs-tab-active", text: name
    end

    def has_item_amount?(amount)
      has_field?('amount_budgeted', with: amount)
    end

    def click_delete
      find(".ant-btn-icon-only.delete-button").click
    end

    def confirm_delete
      find(".ant-confirm-btns .ant-btn-primary").click
    end

    def click_edit_income
      within ".monthly-overview-stats h3" do
        find("button").click
      end
    end

    def click_sidebar_housing
      within ".icon-bar" do
        find("span", text: "Housing").click
      end
    end

    def has_active_category?(category)
      has_selector?("h3", text: category.upcase) &&
        has_selector?("h3", text: "#{category.upcase} OVERVIEW")
    end

    def change_year(year)
      find(".anticon-calendar").click
      find(".ant-calendar-picker-input").click
      find(".ant-calendar-month-panel-year-select-content", text: Date.today.year).click
      find(".ant-calendar-year-panel-year", text: year).click
      find(".ant-calendar-month-panel-month", text: Date.today.strftime("%b")).click
    end

    def change_month(month)
      find(".anticon-calendar").click
      find(".ant-calendar-picker-input").click
      find(".ant-calendar-month-panel-month", text: month).click
    end

    def on_month?(month)
      has_selector? ".ant-menu-submenu-title span", text: "#{month} #{Date.today.year}"
    end

    def on_year?(year)
      has_selector? ".ant-menu-submenu-title span", text: "#{Date.today.strftime("%B")} #{year}"
    end

    def click_add_budget_item
      click_on "Add a Budget Item"
    end

    def fill_in_name(name)
      fill_in "name", with: ""
      fill_in "name", with: name
    end

    def fill_in_amount_budgeted(amount)
      fill_in "amount_budgeted", with: ""
      fill_in "amount_budgeted", with: amount
    end

    def click_save
      click_on "Save"
    end

    def click_import_items
      find("[name=importCategory]").click
      click_on "Import Charity"
    end

    def show_expenses
      find(".ant-switch").click
    end

    def missing_expenses?
      has_selector? ".ant-table-placeholder", text: "You haven't added any expenses yet"
    end

    def click_add_expense
      click_on "Add an Expense"
    end

    def fill_in_expense_name(name)
      within '.ant-table' do
        find(".ant-select-search__field__wrap input").set("")
        find(".ant-select-search__field__wrap input").set(name)
      end
    end

    def fill_in_prediction(name)
      within '.ant-table' do
        find(".ant-select-search__field__wrap input").set("")
        find(".ant-select-search__field__wrap input").native.send_keys(name[0,2])
        sleep 0.5
        find(".ant-select-search__field__wrap input").native.send_keys(name[2])
      end
    end

    def fill_in_expense_amount(amount)
      within '.ant-table' do
        fill_in "expense_amount", with: ""
        fill_in "expense_amount", with: amount
      end
    end

    def click_save_expense
      within '.ant-table' do
        click_on "Save Expense"
      end
    end

    def click_delete_expense(name)
      has_selector? ".ant-table"
      within '.ant-table' do
        click_on "Delete Expense"
      end

      has_selector? ".delete-popover"
      within ".delete-popover" do
        click_on "Delete #{name}"
      end
    end

    def click_predicted_expense(name)
      within ".ant-select-dropdown-menu" do
        find("li", text: name).click
      end
    end
  end

  class BudgetIncomeModal < PageObject
    def on_page?
      has_selector? ".ant-modal-header", text: "Update Monthly Income"
    end

    def fill_in_income(amount)
      fill_in "monthly_income", with: ""
      fill_in "monthly_income", with: amount
    end

    def click_save_income
      click_on "Update Monthly Income"
    end
  end
end

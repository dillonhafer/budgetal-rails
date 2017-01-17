module Pages
  class BudgetsPage < PageObject
    def visit_page
      visit root_path
      click_on "Budgets"
    end

    def on_page?
      has_selector? ".main-budget-categories", text: "You haven't added any budget items yet."
    end

    def has_remaining_to_budget?(amount)
      has_selector? 'p', text: "You still need to budget #{amount}"
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

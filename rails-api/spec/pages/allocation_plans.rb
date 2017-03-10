module Pages
  class AllocationPlans < PageObject
    def visit_page
      visit root_path
      click_on "Detailed Budgets"
    end

    def on_page?
      has_selector? "span", text: "New Pay Period"
    end

    def has_empty_message?
      has_selector? ".body-row p", text:"You haven't added any pay periods yet."
    end

    def click_new_pay_period
      click_on "New Pay Period"
    end

    def has_overview_income?(income)
      has_selector? ".pay-period-income", text: income
    end

    def click_delete
      find(".ant-dropdown-trigger").click
      find(".ant-dropdown-menu-item a", text: "Delete").click
    end

    def click_edit
      find(".ant-dropdown-trigger").click
      find(".ant-dropdown-menu-item a", text: "Edit", wait: 5).click
    end
  end

  class AllocationPlanModal < PageObject
    def on_page?
      has_selector? ".ant-modal-title", text: "Pay Period"
    end

    def fill_in_income(val)
      fill_in "income", with: ""
      fill_in "income", with: val
    end

    def click_save
      click_on "Save"
    end
  end
end


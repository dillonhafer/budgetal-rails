module Pages
  class NavPage < PageObject
    def click_sign_in_up
      within "header" do
        click_on 'Sign in / Sign up'
      end
    end

    def click_sign_up_tab
      has_selector?('.ant-tabs-tab', text: 'Sign Up')
      find('.ant-tabs-tab', text: 'Sign Up').click
    end

    def click_forgot_password_tab
      has_selector?('.ant-tabs-tab', text: 'Forgot Password?')
      find('.ant-tabs-tab', text: 'Forgot Password?').click
    end

    def on_sign_in?
      has_selector?('.ant-modal-title', text: 'Sign In or Join')
    end

    def on_sign_up?
      has_selector?('.ant-tabs-tab-active.ant-tabs-tab', text: 'Sign Up')
    end

    def on_forgot_password?
      has_selector?('.ant-tabs-tab-active.ant-tabs-tab', text: 'Forgot Password?')
    end

    def signed_in_as?(first_name)
      within "header" do
        has_selector? 'span', text: "Hello, #{first_name}!", visible: false
      end
    end

    def click_sign_out
      find('.ant-menu-submenu-title').click
      click_on "Sign out"
    end

    def click_account_settings
      find('.ant-menu-submenu-title').click
      click_on "Account Settings"
    end

    def click_budgets
      within "header" do
        click_on "Budgets"
      end
    end
  end
end

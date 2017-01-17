module Pages
  class ForgotPasswordModal < PageObject
    def fill_in_email(email)
      within '.ant-tabs-tabpane.ant-tabs-tabpane-active' do
        fill_in 'email', with: email
      end
    end

    def click_request_password_reset
      within '.ant-tabs-tabpane.ant-tabs-tabpane-active' do
        click_on 'Request Password Reset'
      end
    end
  end
end

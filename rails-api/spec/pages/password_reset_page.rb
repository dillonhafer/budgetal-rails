class PasswordResetPage < PageObject
  attr_reader :path

  def initialize(email_link:,test_token:,bad_token:)
    @path = email_link.gsub('localhost', "localhost:#{Capybara.current_session.server.port}")
                      .gsub(bad_token, test_token)
  end

  def visit_page
    visit path
  end

  def on_page?
    current_path == '/reset-password'
  end

  def click_change_password
    click_on 'Change Password'
  end

  def fill_in_password(password)
    fill_in 'password', with: password
  end

  def fill_in_password_confirmation(password)
    fill_in 'password_confirmation', with: password
  end
end

class SignInModal < PageObject
  def click_sign_in
    within '.ant-tabs-tabpane.ant-tabs-tabpane-active' do
      click_on "Sign In"
    end
  end

  %w(email password).each do |field|
    define_method(:"fill_in_#{field}") do |val|
      fill_in field, with: val
    end
  end
end

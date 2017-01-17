class SignUpModal < PageObject
  def click_sign_up
    click_on 'Sign Up'
  end

  %w(email first_name last_name password password_confirmation).each do |field|
    define_method(:"fill_in_#{field}") do |val|
      fill_in field, with: val
    end
  end
end

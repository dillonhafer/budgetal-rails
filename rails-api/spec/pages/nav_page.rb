class NavPage < PageObject
  def click_sign_in
    within "header" do
      click_on 'Sign in / Sign up'
    end
  end

  def click_sign_up
    has_selector?('.ant-tabs-tab', text: 'Sign Up')
    find('.ant-tabs-tab', text: 'Sign Up').click
  end

  def on_sign_in?
    has_selector?('.ant-modal-title', text: 'Sign In or Join')
  end

  def on_sign_up?
    has_selector?('.ant-tabs-tab-active.ant-tabs-tab', text: 'Sign Up')
  end

  def signed_in_as?(first_name)
    within "header" do
      has_selector? 'span', text: "Hello, #{first_name}!", visible: false
    end
  end
end

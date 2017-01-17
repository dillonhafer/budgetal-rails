require 'rails_helper'
require 'support/email_support'

feature 'Sign up', :js do
  include EmailSupport

  context 'As a visitor' do
    let(:user) do
      {
        email: Faker::Internet.email,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: 'Password1'
      }
    end
    let(:home_page) { HomePage.new }
    let(:nav_page) { NavPage.new }
    let(:sign_up_modal) { SignUpModal.new }

    scenario 'I can sign up for budgetal' do
      home_page.sign_out
      home_page.visit_page
      expect(home_page).to be_on_page

      nav_page.click_sign_in
      expect(nav_page).to be_on_sign_in

      nav_page.click_sign_up
      expect(nav_page).to be_on_sign_up

      sign_up_modal.fill_in_email(user[:email])
      sign_up_modal.fill_in_first_name(user[:first_name])
      sign_up_modal.fill_in_last_name(user[:last_name])
      sign_up_modal.fill_in_password(user[:password])
      sign_up_modal.fill_in_password_confirmation(user[:password])
      sign_up_modal.click_sign_up

      expect(nav_page).to be_signed_in_as(user[:first_name])
      expect(find_last_email_to(user[:email])).not_to be_blank
    end
  end
end

require 'rails_helper'
require 'support/feature_helper'
require 'support/email_support'

feature 'Password Reset', :js do
  include EmailSupport

  let!(:user) { FactoryGirl.create(:user) }

  context 'As a signed out user' do
    scenario 'I can request a password reset' do
      sign_out
      visit root_path
      expect(user.sign_in_count).to eq 0

      # Sign In Spec
      click_on 'Sign in / Sign up'
      expect(page).to have_selector 'h2', text: 'Welcome!'
      click_on 'Sign in'
      within('.overlay') do
        find('#forgotYourPassword').click
      end

      fill_in 'resetEmail', with: user.email.to_s
      click_on 'Request Password Reset'
      expect(page).to have_selector '.flash-box', text: "We just sent you an email with instructions on how to reset your password"
      expect(find_mail_with_subject('Reset password instructions')).not_to be_blank
    end

    scenario "clicking password link in email resets password" do
      user.send_reset_password_instructions
      expect(user.reset_password_token).not_to be_blank
      expect(find_mail_with_subject('Reset password instructions').links.first).to have_content user.reset_password_token
    end
  end
end

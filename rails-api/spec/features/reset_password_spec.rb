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

    context 'clicking password link in email' do
      let(:token) { user.reset_password_token }

      before do
        visit root_path
        user.send_reset_password_instructions
        expect(token).not_to be_blank

        reset_link = find_mail_with_subject('Reset password instructions').links.first
        path = reset_link.gsub('localhost', "localhost:#{Capybara.current_session.server.port}")
        path.gsub! user.reset_password_token, token

        visit path
        expect(current_path).to eq('/reset-password')

        fill_in 'password', with: 'new password'
        fill_in 'password_confirmation', with: 'new password'
        click_on 'Change Password'
      end

      context 'with a bad token' do
        let(:token) { 'bad token' }

        scenario "does not change password" do
          expect(page).to have_selector '.flash-box', text: "Password Reset Failed. Your email may have expired."
        end
      end

      scenario "resets password" do
        expect(page).to have_selector '.flash-box', text: "Your password has been updated"
      end
    end
  end
end

require 'rails_helper'
require 'support/feature_helper'
require 'support/email_support'

feature 'Password Reset', :js do
  include EmailSupport

  let!(:user) { FactoryGirl.create(:user) }
  let(:notice_modal) { Pages::NoticeModal.new }

  context 'As a signed out user' do
    let(:forgot_password_modal) { Pages::ForgotPasswordModal.new }
    let(:home_page) { Pages::HomePage.new }
    let(:nav_page) { Pages::NavPage.new }

    scenario 'I can request a password reset' do
      home_page.sign_out
      home_page.visit_page
      expect(home_page).to be_on_page

      nav_page.click_sign_in_up
      expect(nav_page).to be_on_sign_in

      nav_page.click_forgot_password_tab
      expect(nav_page).to be_on_forgot_password

      forgot_password_modal.fill_in_email(user.email)
      forgot_password_modal.click_request_password_reset

      expect(notice_modal).to have_notice("We just sent you an email with instructions on how to reset your password")
      expect(find_mail_with_subject('Reset password instructions')).not_to be_blank
    end

    context 'clicking password link in email' do
      let(:token) { user.reset_password_token }

      before do
        user.send_reset_password_instructions
        reset_link = find_mail_with_subject('Reset password instructions').links.first
        password_reset_page = Pages::PasswordResetPage.new(email_link: reset_link, test_token: token, bad_token: user.reset_password_token)
        password_reset_page.visit_page
        expect(password_reset_page).to be_on_page

        password_reset_page.fill_in_password('new password')
        password_reset_page.fill_in_password_confirmation('new password')
        password_reset_page.click_change_password
      end

      context 'with a bad token' do
        let(:token) { 'bad token' }

        scenario "does not change password" do
          expect(notice_modal).to have_error("The link in your email may have expired.")
        end
      end

      scenario "resets password" do
        expect(notice_modal).to have_notice("Your password has been updated")
      end
    end
  end
end

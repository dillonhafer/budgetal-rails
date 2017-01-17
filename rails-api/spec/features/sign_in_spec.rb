require 'rails_helper'

feature 'Sign in', :js do
  let(:user) { FactoryGirl.create(:user) }
  let(:home_page) { HomePage.new }
  let(:nav_page) { NavPage.new }
  let(:sign_in_modal) { SignInModal.new }
  let(:notice_modal) { NoticeModal.new }

  context 'As a signed out user' do
    it 'I can sign in to/out of budgetal' do
      home_page.sign_out
      home_page.visit_page
      expect(home_page).to be_on_page

      # Signing In
      nav_page.click_sign_in_up
      expect(nav_page).to be_on_sign_in

      sign_in_modal.fill_in_email(user.email)
      sign_in_modal.fill_in_password(user.password)
      sign_in_modal.click_sign_in

      expect(notice_modal).to have_notice("You are now signed in")
      notice_modal.dismiss
      expect(nav_page).to be_signed_in_as(user.first_name)

      # Sign Out Spec
      nav_page.click_sign_out
      expect(notice_modal).to have_notice("You are now signed out")
      notice_modal.dismiss
      expect(nav_page).not_to be_signed_in_as(user.first_name)
    end
  end
end

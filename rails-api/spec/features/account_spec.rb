require 'rails_helper'
require 'support/feature_helper'

feature 'Account', :js do
  let(:notice_modal) { Pages::NoticeModal.new }
  let(:home_page)    { Pages::HomePage.new }
  let(:nav_page)     { Pages::NavPage.new }
  let(:account_settings_page) { Pages::AccountSettingsPage.new }

  context 'Without a logged in user' do
    scenario 'gets redirected' do
      sign_out
      visit '/account-settings'
      expect(notice_modal).to have_error('You need to sign in.')
      expect(home_page).to be_on_page
    end
  end

  context 'As a logged in user' do
    scenario 'I can visit account page' do
      login
      home_page.visit_page
      nav_page.click_account_settings
      expect(account_settings_page).to be_on_page
    end
  end
end

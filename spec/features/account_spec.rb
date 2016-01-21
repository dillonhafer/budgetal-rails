require 'rails_helper'
require 'support/feature_helper'

feature 'Account', js: true do
  context 'Without a logged in user' do
    it 'gets redirected' do
      visit '/account'
      expect(page).to have_selector('.flash-box')
      expect(page).not_to have_selector('#js-user-greeting')
      expect(current_path).to eq('/')
    end
  end

  context 'As a logged in user' do
    it 'I can visit account page' do
      user = login_with
      visit root_path
      find('#js-user-greeting').click
      click_on 'Account Settings'
      expect(page).to have_selector('h3', text: 'ACCOUNT SETTINGS', count: 1)
    end
  end
end
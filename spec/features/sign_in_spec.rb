require 'rails_helper'

feature 'Sign in', js: true do
  let(:user) { FactoryGirl.create(:user) }

  context 'As a signed out user' do
    it 'I can sign in to/out of budgetal' do
      sign_out
      visit root_path

      # Sign In Spec
      click_on 'Sign in / Sign up'
      expect(page).to have_selector 'h2', text: 'Welcome!'
      click_on 'Sign in'
      expect(page).to have_selector '#loginEmail'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_on 'Sign in'
      expect(page).to have_selector '.flash-box', text: "You are now signed in"
      expect(page).to have_selector 'a', text: "Hello, #{user.first_name}!"

      # Sign Out Spec
      find('.flash-box').click
      click_on 'Sign out'
      expect(page).to have_selector '.flash-box', text: "You are now signed out"
      expect(page).to have_selector 'a', text: "Sign in / Sign up"
      expect(page).not_to have_selector 'a', text: "Hello, #{user.first_name}!"
    end
  end
end

def sign_out
  visit '/'
  page.execute_script "localStorage.clear()"
end
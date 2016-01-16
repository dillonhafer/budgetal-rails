require 'rails_helper'
require 'support/feature_helper'
require 'support/mailer_helper'
RSpec.configure {|r| r.include MailerHelper}

feature 'Sign up', js: true do
  context 'As a visitor' do
    it 'I can sign up for budgetal' do
      sign_out
      visit root_path
      puts page.body
      click_on 'Sign in / Sign up'
      expect(page).to have_selector 'h2', text: 'Welcome!'
      click_on 'Join Us'
      expect(page).to have_selector '#new_user'
      fill_in 'Email', with: user[:email]
      fill_in 'First Name', with: user[:first_name]
      fill_in 'Last Name', with: user[:last_name]
      fill_in 'Password', with: user[:password]
      fill_in 'Password Confirmation', with: user[:password]
      click_on 'Sign up'
      expect(page).to have_selector 'a', text: "Hello, #{user[:first_name]}!"
      expect(first_email.to).to eq([user[:email]])
    end
  end
end

def user
  @user ||= {
    email: Faker::Internet.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    password: 'Password1'
  }
end

def sign_out
  visit '/'
  page.execute_script "localStorage.clear()"
end

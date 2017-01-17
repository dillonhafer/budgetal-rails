require 'rails_helper'
require 'support/feature_helper'
require 'support/email_support'

class PageObject
  include Capybara::DSL
  include Rails.application.routes.url_helpers
  include EmailSupport
end

class HomePage < PageObject
  def visit_page
    visit root_path
  end

  def on_page?
    has_selector? '.slider-text h2', text: 'Budgetal'
  end
end

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

class SignUpModal < PageObject
  def click_sign_up
    click_on 'Sign Up'
  end

  %w(email first_name last_name password password_confirmation).each do |field|
    define_method(:"fill_in_#{field}") do |val|
      fill_in field, with: val
    end
  end
end

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
      sign_out
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

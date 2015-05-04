require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

module Features
  module SessionHelpers
    def login_with(user=FactoryGirl.create(:user))
      login_as user, scope: :user
      user
    end
  end
end

RSpec.configure do |config|
  config.include Features::SessionHelpers, type: :feature
end

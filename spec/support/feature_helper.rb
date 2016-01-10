require 'rails_helper'

module FeatureHelper
  include Warden::Test::Helpers
  Warden.test_mode!

  def login(user = FactoryGirl.create(:user))
    login_as user, scope: :user
    user
  end

  def login_with(user=FactoryGirl.create(:user))
    login_as user, scope: :user
    user
  end
end

RSpec.configure do |config|
  config.include FeatureHelper, type: :feature
end

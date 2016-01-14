require 'rails_helper'

module FeatureHelper
  include Warden::Test::Helpers
  Warden.test_mode!

  def login(user = FactoryGirl.create(:user))
    ses = FactoryGirl.create(:session, user: user)
    visit '/'
    page.execute_script(<<-JS)
      var session = {
        authentication_token: '#{ses.authentication_token}',
        authentication_key: '#{ses.authentication_key}'
      };
      var user = {
        first_name: '#{user.first_name}',
        admin: '#{user.admin?}'
      };
      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('user', JSON.stringify(user));
    JS
    user
  end

  def login_with(user=FactoryGirl.create(:user))
    login(user)
  end
end

RSpec.configure do |config|
  config.include FeatureHelper, type: :feature
end

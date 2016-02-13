require 'rails_helper'

module FeatureHelper
  def login(user = FactoryGirl.create(:user))
    session = FactoryGirl.create(:session, user: user)
    visit '/'
    client_login(user: user, session: session)
    user
  end

  def client_login(user:, session:)
    page.execute_script(<<-JS)
      var session = {
        authentication_token: '#{session.authentication_token}',
        authentication_key: '#{session.authentication_key}',
        user_agent: '#{session.user_agent}',
        ip: '#{session.ip}',
        created_at: '#{session.created_at}'
      };
      var user = {
        first_name: '#{user.first_name}',
        last_name: '#{user.last_name}',
        email: '#{user.email}',
        admin: '#{user.admin?}'
      };

      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('user', JSON.stringify(user));
    JS
  end

  def sign_out
    visit '/'
    page.execute_script "localStorage.clear()"
  end
end

RSpec.configure do |config|
  config.include FeatureHelper, type: :feature
end

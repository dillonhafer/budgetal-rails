require 'rails_helper'

module FeatureHelper
  def login(user = FactoryGirl.create(:user))
    ses = FactoryGirl.create(:session, user: user)
    visit '/'
    client_login(user: user, session: ses)
    user
  end

  def login_with(user=FactoryGirl.create(:user))
    login(user)
  end

  def client_login(user:, session:)
    page.execute_script(<<-JS)
      var sess = {
        authentication_token: '#{session.authentication_token}',
        authentication_key: '#{session.authentication_key}'
      };
      var user = {
        first_name: '#{user.first_name}',
        admin: '#{user.admin?}'
      };
      localStorage.setItem('session', JSON.stringify(sess));
      localStorage.setItem('user', JSON.stringify(user));
    JS
  end
end

RSpec.configure do |config|
  config.include FeatureHelper, type: :feature
end

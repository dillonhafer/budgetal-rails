FactoryGirl.define do
  factory :session do
    authentication_token 'token'
    authentication_key   'key'
    ip                   '127.0.0.1'
    user_agent           'OSX'
  end
end

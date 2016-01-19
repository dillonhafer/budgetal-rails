require 'rails_helper'

describe User do
  subject { FactoryGirl.create :user }

  describe '#expire_previous_sessions' do
    let!(:old_session)    { FactoryGirl.create(:session, user: subject, user_agent: 'MATCHER') }
    let!(:active_session) { FactoryGirl.create(:session, user: subject, user_agent: 'MATCHER') }

    it 'expires sessions with a matching user agent' do
      expect {
        subject.expire_previous_sessions(keep: active_session)
      }.to change {old_session.reload.expired_at}.from(nil)
    end

    it 'does not expire sessions without a matching user agent' do
      not_match = FactoryGirl.create(:session, user: subject, user_agent: 'OSX')

      expect {
        subject.expire_previous_sessions(keep: active_session)
      }.not_to change {not_match.reload.expired_at}.from(nil)
    end

    it 'does not expire the passed in session' do
      expect {
        subject.expire_previous_sessions(keep: active_session)
      }.not_to change {active_session.reload.expired_at}
    end

    it 'expires sessions at the given time' do
      time = Time.new(1998,8,3)

      expect {
        subject.expire_previous_sessions(keep: active_session, time: time)
      }.to change {old_session.reload.expired_at}.from(nil).to time
    end
  end
end
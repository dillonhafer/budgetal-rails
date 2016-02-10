class Session < ActiveRecord::Base
  self.primary_key = 'authentication_key'

  belongs_to :user

  def self.active
    where(expired_at: nil)
  end

  def self.expired
    where('expired_at is not null')
  end

  def self.expire(time: Time.now)
    active.update_all(expired_at: time)
  end
end

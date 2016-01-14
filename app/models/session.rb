class Session < ActiveRecord::Base
  self.primary_key = 'authentication_key'

  belongs_to :user

  def self.active
    where(expired_at: nil)
  end
end

require 'rails_helper'

module MailerHelper
  def emails
    ActionMailer::Base.deliveries
  end

  def first_email
    emails.first
  end
end

RSpec.configure do |config|
  config.before(:each) do
    ActionMailer::Base.delivery_method = :test
    ActionMailer::Base.perform_deliveries = true
    ActionMailer::Base.deliveries = []
  end

  config.after(:each) do
    ActionMailer::Base.deliveries.clear
  end

  config.include MailerHelper, type: :mailer
end

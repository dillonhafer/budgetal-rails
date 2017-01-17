require 'support/email_support'

class PageObject
  include Capybara::DSL
  include Rails.application.routes.url_helpers
  include EmailSupport
end

Budgets::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # The test environment is used exclusively to run your application's
  # test suite. You never need to work with it otherwise. Remember that
  # your test database is "scratch space" for the test suite and is wiped
  # and recreated between test runs. Don't rely on the data there!
  config.cache_classes = true

  # Configure static asset server for tests with Cache-Control for performance
  config.serve_static_files = true
  config.static_cache_control = "public, max-age=3600"

  # Log error messages when you accidentally call methods on nil.
  config.eager_load = false

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = false

  # Raise exceptions instead of rendering exception templates
  config.action_dispatch.show_exceptions = false
  config.action_mailer.default_url_options = { host: "localhost" }

  # Print deprecation notices to the Rails logger
  config.action_mailer.delivery_method = :test

  # Print deprecation notices to the stderr
  config.active_support.deprecation = :stderr
  config.action_mailer.default_url_options = { host: "localhost:3000" }

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin
  config.log_level = :debug
end

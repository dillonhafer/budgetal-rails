namespace :db do
  namespace :mobile_integration do
    desc "Prepare mobile integration test suite"
    task :prepare do
      Rails.env = ENV['RAILS_ENV'] = 'mobile_integration'
      `bin/rails db:environment:set RAILS_ENV=mobile_integration`
      Rake::Task['db:drop'].invoke
      Rake::Task['db:create'].invoke
      Rake::Task['db:structure:load'].invoke
    end
  end
end

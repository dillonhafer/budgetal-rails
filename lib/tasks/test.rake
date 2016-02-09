def test_commands
  ["bundle exec rspec spec --exclude-pattern 'spec/features/*'"]
end

desc "Run both test suites"
task :all_tests do
  test_commands.each do |cmd|
    puts "\n----> Running: #{cmd}"
    system(cmd)
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

task :int do
  port          = 3388
  database      = 'budgetal_test_3388'
  budgetal_cmd  = File.directory?('/tmp/budgetal') ? 'cd /tmp/budgetal && git pull' : 'git clone https://github.com/dillonhafer/budgetal /tmp/budgetal'
  webclient_cmd = File.directory?('/tmp/budgetal-webclient') ? 'cd /tmp/budgetal-webclient && git pull' : 'git clone https://github.com/dillonhafer/budgetal-webclient /tmp/budgetal-webclient'
  database_cmd  = `psql -c "select count(*) from pg_catalog.pg_database where datname = 'budgetal_test_3388'" | grep '[0-9]$'`.to_i == 0 ? "createdb #{database}" : ''

  commands = [
    budgetal_cmd,
    webclient_cmd,
    database_cmd,
    # "cd /tmp/budgetal-webclient && npm install && API_URL=http://localhost:#{port} npm run build",
    'cp /tmp/budgetal-webclient/build/* /tmp/budgetal/public',
    'cp -r /tmp/budgetal-webclient/static/* /tmp/budgetal/public',
    "echo 'RAILS_TEST_DATABASE: \'#{database}\'' > /tmp/budgetal/.env",
    'cd /tmp/budgetal && bundle && RAILS_ENV=test rake db:test:prepare && bundle exec rspec spec/features'
  ]

  commands.each do |cmd|
    puts "\n----> Running: #{cmd}"
    system(cmd)
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

task(:default).clear.enhance(["rake:all_tests"])

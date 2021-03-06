def test_commands
  ["bundle exec rspec spec --exclude-pattern 'spec/features/*'"]
end

desc "Clear all running servers"
task :clear do
  pids = []
  Dir.glob('tmp/pids/*.pid') do |file|
    pids << File.read(file).to_i
  end

  pids.each do |pid|
    Process.kill("HUP", pid)
  end
end

desc "Run both test suites"
task :all_tests do
  test_commands.each do |cmd|
    puts "\n----> Running: #{cmd}"
    system(cmd)
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

desc "Run both test suites"
task :features do
  cmd = 'bundle exec rspec spec/features'
  puts "\n----> Running: #{cmd}"
  system(cmd)
  raise "#{cmd} failed!" unless $?.exitstatus == 0
end

desc "Run javascript tests"
task :javascript do
  cmd = 'cd ../react-webclient && npm run test'
  puts "\n----> Running: #{cmd}"
  system(cmd)
  raise "#{cmd} failed!" unless $?.exitstatus == 0
end

task :int do
  database      = 'budgetal_test_3388'
  budgetal_cmd  = File.directory?('/tmp/budgetal') ? 'cd /tmp/budgetal && git pull' : 'git clone https://github.com/dillonhafer/budgetal /tmp/budgetal'
  database_cmd  = `psql -c "select count(*) from pg_catalog.pg_database where datname = 'budgetal_test_3388'" | grep '[0-9]$'`.to_i == 0 ? "createdb #{database}" : 'echo database exists. skipping...'

  commands = [
    budgetal_cmd,
    database_cmd,
    "cd /tmp/budgetal/react-webclient && npm install && API_URL=http://localhost:3388 npm run build",
    'cp /tmp/budgetal/react-webclient/build/* /tmp/budgetal/rails-api/public',
    'cp -r /tmp/budgetal/react-webclient/static/* /tmp/budgetal/rails-api/public',
    "echo 'RAILS_TEST_DATABASE: \'#{database}\'' > /tmp/budgetal/rails-api/.env",
    'cd /tmp/budgetal/rails-api && bundle && RAILS_ENV=test rake db:test:prepare && bundle exec rake && bundle exec rspec spec/features'
  ]

  commands.each do |cmd|
    puts "\n----> Running: #{cmd}"
    system(cmd)
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

task(:default).clear.enhance(["rake:all_tests"])

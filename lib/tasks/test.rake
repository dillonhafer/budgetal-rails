def test_commands
  ["npm test", "bundle exec rspec spec --exclude-pattern 'spec/features/*'", "bundle exec rspec spec/features"]
end

desc "Run both test suites"
task :all_tests do
  test_commands.each do |cmd|
    puts "\n----> Running: #{cmd}"
    system(cmd)
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

desc "Adds firefox integration tests for ci to run"
task :ci do
  test_commands.<<("selenium=selenium bundle exec rspec spec/features").each do |cmd|
    puts "\n----> Running: #{cmd}"
    system(cmd)
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

task(:default).clear.enhance(["rake:all_tests"])

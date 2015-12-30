desc "Run both test suites"
task :all_tests do
  ["npm test", "bundle exec rspec spec"].each do |cmd|
    puts "Starting to run #{cmd}..."
    system(cmd)
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

task(:default).clear.enhance(["rake:all_tests"])
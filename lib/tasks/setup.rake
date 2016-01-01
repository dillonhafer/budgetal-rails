namespace :setup do
  desc 'Dependancy check'
  task :dependancies do
    ['chromedriver', 'npm'].each do |dep|
      echo "Checking for #{dep}"
      file = `which #{dep}`.chomp
      raise fail("#{dep} is missing!") unless File.exist?(file)
    end
  end

  desc 'Bundle'
  task :bundle do
    echo "Installing gems"
    system('bundle install')
    raise fail("Installing gems failed!") unless $?.exitstatus == 0
  end

  desc 'Create .env file'
  task :env do
    echo "Creating .env file"
    system('cp -i .env{.example,}')
  end

  desc 'Setup database'
  task :db do
    echo 'Setting up databases'
    system('rake db:drop')
    system('rake db:setup')
    raise fail("rake db:setup failed!") unless $?.exitstatus == 0
  end

  desc 'Install npm dependancies'
  task :npm_install do
    echo 'Install npm dependancies'
    system 'npm install'
    raise fail("npm install failed!") unless $?.exitstatus == 0
  end

  desc 'Build first webpack file'
  task :npm_build do
    echo 'Building first webpack file'
    system 'webpack --config webpack/dev.config.js'
    raise fail("npm build failed!") unless $?.exitstatus == 0
  end

  desc 'Show done message'
  task :done do
    echo "Done"
    print("\n   ")
    puts("\e[35mNow run \`rails s' and open your browser to http://localhost:3000\e[0m\n\n")
  end

  task all: [:dependancies, :bundle, :env, :db, :npm_install, :npm_build, :done]
end
task setup: ['setup:all']


def echo(cmd)
  puts "\e[32m----->\e[0m #{cmd}\n"
end

def fail(message)
  "\n\e[31m-----> #{message}\e[0m\n\n"
end
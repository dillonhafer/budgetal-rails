require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'
require 'mina/hooks'

set :repository, 'https://github.com/dillonhafer/budgetal.git'

case ENV['to']
when 'beta'
  set :domain, 'beta.budgetal.com'
  set :deploy_to, '/var/www/budgetal-beta'
  set :branch, 'beta'
  set :rails_env, 'beta'
else
  ENV['to'] = 'production'
  set :domain, 'www.budgetal.com'
  set :deploy_to, '/var/www/budgetal-production'
  set :branch, 'master'
  set :rails_env, 'production'
end

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  invoke :'rvm:use[ruby-2.2.1@budgetal]'
end

# Run `mina setup` to create these paths on your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['.env', 'log', 'tmp/pids', 'tmp/cache', 'public/assets']

set :user, 'deployer'
set :keep_releases, 4

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
task setup: :environment do
  queue! %[mkdir -p "#{deploy_to}/db-backups"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/db-backups"]

  queue! %[mkdir -p "#{deploy_to}/shared"]
  queue! %[touch "#{deploy_to}/shared/.env"]

  queue! %[mkdir -p "#{deploy_to}/shared/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/log"]

  queue! %[mkdir -p "#{deploy_to}/shared/tmp/pids"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/tmp/pids"]

  queue! %[mkdir -p "#{deploy_to}/shared/tmp/cache"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/tmp/cache"]

  queue! %[mkdir -p "#{deploy_to}/shared/public/assets"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/public/assets"]
end

desc 'Make sure local git is in sync with remote.'
task :check_revision do
  unless `git rev-parse HEAD` == `git rev-parse origin/#{branch}`
    puts "WARNING: HEAD is not the same as origin/#{branch}"
    puts "Run `git push` to sync changes."
    exit
  end
end

desc "Deploys the App."
task deploy: :environment do
  before_mina :'frontend:build'

  deploy do
    invoke :'check_revision'
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'

    to :launch do
      invoke :'passenger:restart'
    end

    to :clean do
      invoke :'deploy:cleanup'
    end
  end
  after_mina :'frontend:sync'
end

namespace :frontend do
  desc "Synchronize new assets"
  task :sync do
    if check_for_local_changes('app/frontend')
      puts "\e[32m----->\e[0m Synchronizing assets"
      `rsync -r --exclude main.css --exclude main.js public/assets/ #{user}@#{domain}:#{deploy_to}/shared/public/assets/`
      `rm -f public/assets/main-* public/assets/manifest`
    else
      puts "\e[32m----->\e[0m Skipping asset synchronizing"
    end
  end

  desc "Compile Webpack assets"
  task :build do
    if check_for_local_changes('app/frontend')
      puts "\e[32m----->\e[0m Building assets"
      sha = Digest::SHA1.hexdigest(Time.now.to_s)
      `NODE_ENV=#{ENV['to']} npm run build`
      `mv public/assets/main-{replace-with-hash,#{sha}}.js`
      `mv public/assets/main-{replace-with-hash,#{sha}}.css`
      `echo #{sha} > public/assets/manifest`
    else
      puts "\e[32m----->\e[0m Skipping asset building"
    end
  end
end

def check_for_local_changes(path)
  current_sha = `ssh #{user}@#{domain} 'cd #{deploy_to}/scm && git rev-parse HEAD'`
  diffs = `git diff --name-only HEAD #{current_sha}`.split("\n")
  diffs.map {|s| s.include?(path)}.any?
end

namespace :logs do
  desc "Follows the log file."
  task :rails do
    queue 'echo "Contents of the log file are as follows:"'
    queue "tail -f #{deploy_to}/current/log/#{ENV['to']}.log"
  end
end

namespace :run do
  desc "Runs a rails console session."
  task :console do
    queue "cd #{deploy_to}/current ; bundle exec rails console #{ENV['to']}"
  end
end

namespace :pg do
  desc "Creates a postgres backup."
  task backup: :environment do
    backup_date = Time.now.strftime("%Y%m%d%H%M%S")
    command     = "pg_dump -Fc budgets > #{deploy_to}/db-backups/#{backup_date}.dump"
    queue "echo -e '\e[32m----->\e[0m Dumping database\n       #{command}'"
    queue command
  end
end

namespace :passenger do
  task :restart do
    queue %{
      echo "-----> Restarting passenger"
      #{echo_cmd %[mkdir -p tmp]}
      #{echo_cmd %[touch tmp/restart.txt]}
    }
  end
end

namespace :maintenance do
  task :on do
    queue %{
      echo "-----> Enabling maintenance mode"
      #{echo_cmd %[touch #{deploy_to}/current/public/maintenance]}
    }
  end

  task :off do
    queue %{
      echo "-----> Disabling maintenance mode"
      #{echo_cmd %[rm #{deploy_to}/current/public/maintenance]}
    }
  end
end

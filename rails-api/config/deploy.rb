require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'

set :repository, 'https://github.com/dillonhafer/budgetal.git'

case ENV['to']
when 'beta'
  set :domain, 'beta.budgetal.com'
  set :subdir, 'rails-api'
  set :deploy_to, '/var/www/budgetal-beta'
  set :branch, 'beta'
  set :rails_env, 'beta'
else
  ENV['to'] = 'production'
  set :subdir, 'rails-api'
  set :domain, 'api.budgetal.com'
  set :deploy_to, '/var/www/budgetal-production'
  set :branch, 'master'
  set :rails_env, 'production'
end

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  invoke :'rvm:use[ruby-2.3.0@budgetal]'
  queue! %[source #{deploy_to}/shared/overrides.env]
end

# Run `mina setup` to create these paths on your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['.env', 'log', 'tmp/pids', 'tmp/cache', 'public/assets', 'public/system']

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
  queue! %[touch "#{deploy_to}/shared/overrides.env"]

  queue! %[mkdir -p "#{deploy_to}/shared/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/log"]

  queue! %[mkdir -p "#{deploy_to}/shared/tmp/pids"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/tmp/pids"]

  queue! %[mkdir -p "#{deploy_to}/shared/tmp/cache"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/tmp/cache"]

  queue! %[mkdir -p "#{deploy_to}/shared/public/assets"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/public/assets"]

  queue! %[mkdir -p "#{deploy_to}/shared/public/system"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/public/system"]
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
  deploy do
    invoke :'maintenance:on'
    invoke :'check_revision'
    invoke :'git:clone'
    invoke :'git:subdirectory'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'

    to :launch do
      invoke :'passenger:restart'
      invoke :'maintenance:off'
    end

    to :clean do
      invoke :'deploy:cleanup'
    end
  end
end

namespace :git do
  desc "Deploy a project that is in a subdirectory"
  task :subdirectory do
    queue %{
      echo "-----> Extracting subdirectory"
      #{echo_cmd %[mv #{subdir}/* .]}
      #{echo_cmd %[rm -rf #{subdir}]}
      #{echo_cmd %[rm -rf ios-client react-webclient README.md]}
    }
  end
end

namespace :logs do
  desc "Follows the log file."
  task :rails do
    queue 'echo "Contents of the log file are as follows:"'
    queue "tail -f #{deploy_to}/current/log/#{ENV['to']}.log"
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
      #{echo_cmd %[passenger-config restart-app #{deploy_to}]}
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
      #{echo_cmd %[rm -f #{deploy_to}/current/public/maintenance]}
    }
  end
end

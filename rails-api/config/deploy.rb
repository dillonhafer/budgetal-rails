require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'

ENV['to'] = 'production'

set :repository, 'https://github.com/dillonhafer/budgetal.git'
set :subdir, 'rails-api'
set :domain, 'api.budgetal.com'
set :deploy_to, '/home/deploy/budgetal'
set :branch, 'ansible'
set :rails_env, 'production'
set :user, 'deploy'
set :keep_releases, 4
set :rvm_use_path, '/usr/local/rvm/scripts/rvm'

set :shared_dirs, fetch(:shared_dirs, []).concat(['log', 'tmp/pids', 'tmp/cache', 'public/assets', 'public/system'])
set :shared_files, ['.env']

task :environment do
  invoke :'rvm:use', 'ruby-2.3.1'
end

desc 'Make sure local git is in sync with remote.'
task :check_revision do
  unless `git rev-parse HEAD` == `git rev-parse origin/#{fetch :branch}`
    puts "WARNING: HEAD is not the same as origin/#{fetch :branch}"
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
    invoke :'deploy:cleanup'

    on :launch do
      in_path(fetch(:current_path)) do
        invoke :'passenger:restart'
        invoke :'maintenance:off'
      end
    end
  end
end

namespace :git do
  desc "Deploy a project that is in a subdirectory"
  task :subdirectory do
    comment "Extracting subdirectory"
    command "mv #{fetch :subdir}/* ."
    command "rm -rf #{fetch :subdir}"
    command "rm -rf ios-client react-webclient README.md"
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
    comment "Restarting passenger"
    command "touch #{fetch :deploy_to}/current/tmp/restart.txt"
  end
end

namespace :maintenance do
  task :on do
    comment "Enabling maintenance mode"
    command "if [ -d \"#{fetch :deploy_to}/current\" ]; then touch #{fetch :deploy_to}/current/public/maintenance; fi"
  end

  task :off do
    comment "Disabling maintenance mode"
    command "rm -f #{fetch :deploy_to}/current/public/maintenance"
  end
end


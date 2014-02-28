require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
# require 'mina/rbenv'  # for rbenv support. (http://rbenv.org)
# require 'mina/rvm'    # for rvm support. (http://rvm.io)
set :repository, 'ssh://git@bitbucket.org/dhafer/budgets.git'

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

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['.env', 'log', 'config/database.yml', 'tmp/pids', 'tmp/cache', 'public/system']

# Optional settings:
set :user, 'deployer'
set :keep_releases, 4

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do  
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
task setup: :environment do
  queue! %[mkdir -p "#{deploy_to}/db-backups"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/db-backups"]

  queue! %[mkdir -p "#{deploy_to}/shared/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/log"]

  queue! %[mkdir -p "#{deploy_to}/shared/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/config"]

  queue! %[touch "#{deploy_to}/shared/config/database.yml"]
  queue  %[echo "-----> Be sure to edit 'shared/config/database.yml'."]

  # TODO work on converting setup for unicorn scripts
  #queue! "ln -nfs #{current_path}/config/nginx.conf /etc/nginx/sites-enabled/#{fetch(:application)}"
  #queue! "ln -nfs #{current_path}/config/unicorn_init.sh /etc/init.d/unicorn_#{fetch(:application)}"
end

desc 'Make sure local git is in sync with remote.'
task :check_revision do  
  unless `git rev-parse HEAD` == `git rev-parse origin/#{branch}`
    puts "WARNING: HEAD is not the same as origin/#{branch}"
    puts "Run `git push` to sync changes."
    exit
  end  
end

# Define unicorn commands
namespace :deploy do
  desc "build missing paperclip styles"
  task :build_missing_paperclip_styles do
    queue "cd #{deploy_to}/current/; RAILS_ENV=#{ENV['to']} bundle exec rake paperclip:refresh:missing_styles"
  end  
end

desc "Deploys the App."
task deploy: :environment do
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'check_revision'
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'

    to :launch do
      invoke :'passenger:restart'
    end
    
    invoke :'deploy:cleanup'
  end
end

namespace :logs do
  desc "Follows the log file."
  task :rails do
    queue 'echo "Contents of the log file are as follows:"'
    queue "tail -f #{deploy_to}/current/log/#{ENV['to']}.log"
  end

  desc "Follows the unicorn error log file."
  task :unicorn do
    queue 'echo "Contents of the log file are as follows:"'
    queue "tail -f #{deploy_to}/current/log/unicorn.stderr.log"
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

# For help in making your deploy script, see the Mina documentation:
#
#  - http://nadarei.co/mina
#  - http://nadarei.co/mina/tasks
#  - http://nadarei.co/mina/settings
#  - http://nadarei.co/mina/helpers

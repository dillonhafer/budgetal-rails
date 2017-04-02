namespace :rollbar do
  desc "Track deploy in rollbar"
  task :track_deploy do
    rev  =`git log -n 1 --pretty=format:"%H"`
    user = `whoami`

    comment "Tracking deploy in rollbar"
    command <<-CURL
      curl https://api.rollbar.com/api/1/deploy/ \
        -F access_token=$(grep ROLLBAR_ACCESS_TOKEN .env | cut -d "'" -f2) \
        -F environment=production \
        -F revision=#{rev} \
        -F local_username=#{user}
    CURL
  end
end

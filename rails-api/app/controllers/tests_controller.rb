class TestsController < ActionController::API
  def setup
    models = params[:data].map do |opt|
      FactoryGirl.create(opt[:factory].to_sym, {}.merge(opt[:options]))
    end
    render json: {factories: models}
  end

  def teardown
    MobileIntegrationTest.teardown(params[:test])
    head :ok
  end

  def reset
    MobileIntegrationTest.reset
    head :ok
  end

  def emails
    user = User.find_by_email(params[:email])
    user.send :set_reset_password_token
    render html: Devise::Mailer.reset_password_instructions(user, user.reset_password_token).to_s.html_safe
  end
end

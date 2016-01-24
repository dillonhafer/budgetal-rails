class Api::SessionsController < AuthenticatedController
  skip_before_action :authenticate_user_from_token, only: [:create]
  respond_to :json

  def index
    render json: {
      sessions: sessions
    }
  end

  def create
    user = User.find_for_database_authentication(email: params[:user][:email])
    return invalid_login_attempt unless user

    if user.valid_password?(params[:user][:password])
      active_session = create_session(user)
      user.expire_previous_sessions(keep: active_session)
      render json: session_json(user: user, session: active_session)
    else
      invalid_login_attempt
    end
  end

  def destroy
    current_user.expire_session(authentication_key: request.headers.fetch('HTTP_X_AUTHENTICATION_KEY'))
    render json: {success: true, message: 'You are now signed out.'}
  end

  protected

  def invalid_login_attempt
    warden.custom_failure!
    render json: {
      success: false,
      message: "Incorrect email or password"
    }, status: 422
  end

  private

  def sessions
    {
      active: current_user.sessions.active.where('authentication_key <> ?', request.headers.fetch('HTTP_X_AUTHENTICATION_KEY')).order('created_at desc'),
      expired: current_user.sessions.expired.order('expired_at desc').limit(10)
    }
  end
end
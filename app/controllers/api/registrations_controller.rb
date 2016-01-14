class Api::RegistrationsController < Api::ApiController
  respond_to :json
  def create
    user = User.new(user_params)
    if user.save
      active_session = create_session(user)
      render json: {
        session: {
          authentication_key: active_session.authentication_key,
          authentication_token: active_session.authentication_token
        },
        user: {
          first_name: user.first_name,
          admin: user.admin?
        },
        success: true,
      }, status: 201
      return
    else
      warden.custom_failure!
      render json: { errors: user.errors }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def create_session(user)
    user.sessions.create({
      authentication_token: SecureRandom.hex(16),
      ip: request.remote_ip,
      user_agent: request.env.fetch('HTTP_USER_AGENT', 'Unknown')
    })
  end
end

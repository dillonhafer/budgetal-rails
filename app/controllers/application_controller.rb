class ApplicationController < ActionController::Base
  before_filter :configure_permitted_parameters, if: :devise_controller?

  after_filter :flash_to_headers
  def flash_to_headers
    if request.xhr?
      #avoiding XSS injections via flash
      flash_json = Hash[flash.map{|k,v| [k,ERB::Util.h(v)] }].to_json
      response.headers['X-Flash-Messages'] = flash_json
      flash.discard
    end
  end

  protected

  def create_session(user)
    user.sessions.create({
      authentication_token: SecureRandom.hex(16),
      ip: request.remote_ip,
      user_agent: request.env.fetch('HTTP_USER_AGENT', 'Unknown')
    })
  end

  def session_json(user:, session:)
    {
      session: {
        authentication_key: session.authentication_key,
        authentication_token: session.authentication_token,
        user_agent: session.user_agent,
        ip: session.ip,
        created_at: session.created_at
      },
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        admin: user.admin?
      },
      success: true
    }
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(
        :email,
        :password,
        :first_name,
        :last_name
      )
    end
    devise_parameter_sanitizer.for(:account_update) do |u|
      u.permit(
        :email,
        :password,
        :password_confirmation,
        :first_name,
        :last_name,
        :current_password
      )
    end
  end
end

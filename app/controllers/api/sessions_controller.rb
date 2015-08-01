class Api::SessionsController < Devise::RegistrationsController
  prepend_before_filter :require_no_authentication, only: [:create, :new]
  after_filter :set_csrf_header, only: [:create, :new]
  after_action :remove_sign_in_cookie, only: [:destroy]
  respond_to :json

  def new
    render json: { success: true }
  end

  def create
    build_resource
    resource = User.find_for_database_authentication(
      email: params[:user][:email]
    )
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in("user", resource)
      set_signed_in
      render json: {
        success: true,
        email: resource.email
      }
      return
    end
    invalid_login_attempt
  end

  protected

  def remove_sign_in_cookie
    cookies.delete :signed_in
  end

  def set_signed_in
    cookies[:signed_in] = true
  end

  def set_csrf_header
    response.headers['X-CSRF-Token'] = form_authenticity_token
  end

  def invalid_login_attempt
    warden.custom_failure!
    render json: {
      success: false,
      message: "Incorrect email or password"
    }, status: 401
  end
end

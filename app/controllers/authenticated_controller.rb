class AuthenticatedController < ApplicationController
  before_filter :authenticate_user_from_token
  respond_to :html, :json

  protected

  def authenticate_user_from_token
    auth_key   = request.headers.fetch('HTTP_AUTHENTICATION_KEY')
    auth_token = request.headers.fetch('HTTP_AUTHENTICATION_TOKEN')

    active_session = Session.active.find_by_authentication_key(auth_key)

    if active_session && Devise.secure_compare(active_session.authentication_token, auth_token)
      @current_user = active_session.user
    end
  end
end

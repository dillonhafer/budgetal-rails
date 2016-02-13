class RegistrationsController < ApplicationController
  respond_to :json

  def create
    user = User.new(user_params)
    if user.save
      active_session = create_session(user)
      render json: session_json(user: user, session: active_session), status: 201
    else
      warden.custom_failure!
      render json: { errors: user.errors }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
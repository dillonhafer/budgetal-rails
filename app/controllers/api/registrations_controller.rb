class Api::RegistrationsController < Api::ApiController
  respond_to :json
  def create
    user = User.new(user_params)
    if user.save
      sign_in("user", user)
      render json: { email: user.email }, status: 201
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
end
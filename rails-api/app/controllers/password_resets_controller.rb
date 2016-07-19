class PasswordResetsController < ApplicationController
  respond_to :json

  def create
    if user = User.find_by(email: params[:email])
      user.send_reset_password_instructions
    end
    render json: {success: true}
  end

  def update
    user = User.where("reset_password_sent_at > '#{5.minutes.ago}' and reset_password_token = ?", params[:password_reset_token]).first

    if user && user.update(reset_password_params)
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  private

  def reset_password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end

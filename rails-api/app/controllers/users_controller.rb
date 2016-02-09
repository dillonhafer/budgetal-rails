class UsersController < AuthenticatedController
  before_action :check_current_password, except: [:past_expenses]

  def past_expenses
    render json: current_user.past_expenses(params[:name])
  end

  def update_account_info
    if update_user(update_account_info_params)
      render json: {success: true, avatar: current_user.data_avatar, message: 'Account info updated'}
    else
      render json: {success: false, errors: current_user.errors}, status: 422
    end
  end

  def change_password
    if update_user(change_password_params)
      render json: {success: true, message: 'Password successfully changed'}
    else
      render json: {success: false, errors: current_user.errors}, status: 422
    end
  end

  private

  def check_current_password
    unless current_user.valid_password?(params[:current_password])
      render json: {success: false, errors: {current_password: 'is not correct'}}, status: 422 and return
    end
  end

  def update_user(params_to_update)
    current_user.update_attributes(params_to_update)
  end

  def change_password_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def update_account_info_params
    params.require(:user).permit(:first_name, :last_name, :email, :avatar)
  end
end
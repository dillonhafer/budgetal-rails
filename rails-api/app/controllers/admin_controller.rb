class AdminController < AuthenticatedController
  def users
    if current_user.admin?
      render json: User.order(:last_name, :first_name), methods: [:current_sign_in_at, :current_sign_in_ip, :sign_in_count]
    else
      render json: {error: 'You are not authorized. This incident will be reported.'}
    end
  end
end
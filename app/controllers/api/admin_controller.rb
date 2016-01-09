class Api::AdminController < AuthenticatedController
  before_filter :require_admin!
  helper_method :users

  private

  def users
    @users ||= User.all
  end

  def require_admin!
    unless current_user.admin?
      sign_out current_user
      flash[:errors] = "You are not authorized. This incident will be reported."
      redirect_to(root_path)
    end
  end
end

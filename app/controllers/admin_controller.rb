class AdminController < ApplicationController
  before_filter :require_admin!

  def index
    @users = User.all
  end

  def destroy
    user = User.find params[:id]
    user.destroy
    redirect_to :back, notice: "Deleted user."
  end

  protected

  def require_admin!
    unless current_user.try(:admin?)
      sign_out current_user
      flash[:errors] = "You are not authorized. This incident will be reported."
      redirect_to(root_path)
    end
  end
end
class PasswordResetsController < ApplicationController
  before_filter :check_password, :only => %w{update}
  before_filter :block_employees, :except => %w{new}
  
  def new
  end
  
  def create
    user = User.find_by_email params[:email].downcase
    unless user.blank?
      user.send_password_reset
      redirect_to root_path, :notice => "Password reset email sent."
    else
      redirect_to root_path, :notice => "Password reset email sent."
    end
  end
  
  def edit
    @user = User.find_by_password_reset_token! params[:id]
  end  
  
  def update
    @user = User.find_by_password_reset_token! params[:id]
    if @user.password_reset_sent_at < 2.hours.ago
      redirect_to new_password_reset_path, :alert => "Password reset has expired."
    elsif @user.update_attributes params[:user]
      redirect_to login_path, :notice => "Password successfully reset."
    else
      render "edit"
    end
  end
  
  private
  
  def check_password 
    @user = User.find_by_password_reset_token! params[:id]
    if params[:user][:password] != params[:user][:password_confirmation]
      @password_error = "Password does not match confirmation."
      flash[:error] = @password_error
      render "edit"
    elsif params[:user][:password].length < 5
      @password_error = "Password must be at least 5 characters long."
      flash[:error] = @password_error
      render "edit"
    end
  end
  
  def block_employees
    user = User.find_by_email params[:email]
    unless user.blank?
      if user.admin?
        redirect_to "/404"
      end
    end
  end
end

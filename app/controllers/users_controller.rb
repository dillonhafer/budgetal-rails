class UsersController < ApplicationController
  before_filter :require_admin, except: %w{my_account new create edit update}
  before_filter :require_user, only: %w{my_account}

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def my_account    
  end

  def create
    @user = User.new params[:user]
    if @user.save
      @user.send_welcome_email
      session[:user_id] = @user.id
      redirect_to my_budgets_path, :notice => "Welcome to Intense-Money!"
      @user.create_initial_budgets
    else
      render 'new'
    end    
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update_attributes params[:user]
      redirect_to my_account_path, :notice => "Updated Info"
    else
      render "edit"
    end
  end

  def destroy
    user = User.find params[:id]
    user.destroy
    user.save
    redirect_to users_path, :notice => "Deleted user."    
  end  
end

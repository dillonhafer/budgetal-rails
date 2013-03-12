class UsersController < ApplicationController
  before_filter :require_admin, except: %w{my_account create}
  before_filter :require_user, only: %w{my_account}

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def my_account
    @bw_file = BwFile.new
    @sent_files = BwFile.where user_id: current_user.id
  end

  def create
    @user = User.new params[:user]
    if @user.save
      session[:user_id] = @user.id
      redirect_to my_account_path, :notice => "Welcome to BW Send!"
    else
      render 'new'
    end
  end

  def edit
    @user = User.find params[:id]
  end

  def update
    @user = User.find params[:id]
    if @user.update_attributes params[:user]
      redirect_to users_path, :notice => "Updated user"
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

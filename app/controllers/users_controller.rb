class UsersController < ApplicationController
  before_filter :require_admin

  def index
    @users = User.all
  end

  def destroy
    user = User.find params[:id]
    user.destroy  
    redirect_to :back, notice: "Deleted user."    
  end  
end

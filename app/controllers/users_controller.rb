class UsersController < ApplicationController
  before_filter :require_admin, except: %w{past_expenses}

  def index
    @users = User.all
  end

  def past_expenses
    users_past_expenses = current_user.past_expenses(params[:name].to_s)
    respond_to do |format|
      format.json { render json: users_past_expenses }
    end
  end

  def destroy
    user = User.find params[:id]
    user.destroy  
    redirect_to :back, notice: "Deleted user."    
  end  
end

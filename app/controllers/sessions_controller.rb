class SessionsController < ApplicationController
  
  def new
  end

  def create
    reset_session
    user = User.authenticate(params[:email], params[:password])
    if user
      session[:user_id] = user.id
      redirect_to my_budgets_path(month: Date.today.month, year: Date.today.year), :notice => "Logged in!"
    else
      flash[:error] = "Invalid email or password"
      redirect_to root_path
    end
  end

  def destroy
    reset_session
    session[:user_id] = nil
    redirect_to root_path, :notice => "Logged out!"
  end
end
class UsersController < ApplicationController
  def past_expenses
    render json: current_user.past_expenses(params[:name])
  end

  def my_account
	  render json: current_user
  end
end

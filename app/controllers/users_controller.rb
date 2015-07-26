class UsersController < ApplicationController
  def past_expenses
    users_past_expenses = current_user.past_expenses(params[:name].to_s)
    users_past_expenses.uniq!
    respond_to do |format|
      format.json { render json: users_past_expenses }
    end
  end
end

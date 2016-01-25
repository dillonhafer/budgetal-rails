class Api::UsersController < AuthenticatedController
  def past_expenses
    render json: current_user.past_expenses(params[:name])
  end
end
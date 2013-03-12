class BudgetsController < ApplicationController
  before_filter :confirm_correct_user

  def update
    @budget = Budget.find params[:id]
    if @budget.update_attributes params[:budget]
      redirect_to my_budgets_path(budget_id: @budget.id), notice: "Updated Budget"
    else
      flash[:error] = "something went wrong!"
      redirect_to my_budgets_path
    end
  end

  def confirm_correct_user    
    redirect_to logout_path if Budget.find(params[:id]).user_id != current_user.id
  end
end

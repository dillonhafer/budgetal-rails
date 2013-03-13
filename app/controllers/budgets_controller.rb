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
    if Budget.find(params[:id]).user_id != current_user.id
      if request.xhr?        
        render :js => "window.location = '#{logout_path}'"
      else
        redirect_to logout_path
      end
    end
  end
end

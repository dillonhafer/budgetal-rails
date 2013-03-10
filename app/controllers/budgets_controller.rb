class BudgetsController < ApplicationController
  def new
  end

  def update
    @budget = Budget.find params[:id]
    if @budget.update_attributes params[:budget]
      redirect_to my_budgets_path(budget_id: @budget.id), notice: "Updated Budget"
    else
      flash[:error] = "something went wrong!"
      redirect_to my_budgets_path
    end
  end

  def show
  end
end

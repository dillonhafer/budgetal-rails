class BudgetsController < ApplicationController
  def new
    next_month = Date.today.advance(months: 1)
    
    if params[:month]
      next_month = Date.new params[:year], params[:month], 1      
    end

    if current_user.budgets.where(month: next_month.month.to_s, year: next_month.year.to_s).any?
      redirect_to my_budgets_path(month: next_month.month.to_s, year: next_month.year.to_s)
    else
      Budget.create_template(next_month.month, next_month.year, current_user.id)
      redirect_to my_budgets_path(month: next_month.month.to_s, year: next_month.year.to_s)
    end
  end

  def update
    @budget = current_user.budgets.find params[:id]
    if @budget.update_attributes(budget_params)
      flash[:notice] = "Updated budget"
      redirect_to my_budgets_path(year: @budget.year, month: @budget.month), notice: "Updated Budget"
    else
      flash[:error] = "something went wrong!"
      redirect_to my_budgets_path(year: @budget.year, month: @budget.month)
    end
  end

  private

  def budget_params
    params.require(:budget).permit(:monthly_income)
  end
end

class BudgetsController < ApplicationController
  def new
    next_month = Date.today.advance(months: 1)
    if current_user.budgets.where(month: next_month.month.to_s, year: next_month.year.to_s).any?
      redirect_to my_budgets_path(month: next_month.month.to_s, year: next_month.year.to_s)
    else
      Budget.create_template(next_month.month, next_month.year, current_user.id)
    end
  end

  def update
    @budget = current_user.budgets.find params[:id]
    if @budget.update_attributes params[:budget]
      redirect_to my_budgets_path(budget_id: @budget.id), notice: "Updated Budget"
    else
      flash[:error] = "something went wrong!"
      redirect_to my_budgets_path
    end
  end
end

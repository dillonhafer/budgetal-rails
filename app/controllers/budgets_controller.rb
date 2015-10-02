class BudgetsController < ApplicationController
  helper_method :budget, :updated_budget
  respond_to :json, only: %w{show update}

  def show
    respond_with budget
  end

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
    flash[:notice] = if updated_budget.update_attributes(budget_params)
      "Updated budget"
    else
      "something went wrong!"
    end
    respond_with updated_budget
  end

  private

  def updated_budget
    @budget ||= current_user.budgets.find(params[:id])
  end

  def budget
    @budget ||= current_user.budgets
                            .includes(:budget_categories, :budget_items, :budget_item_expenses)
                            .find_by(year: params[:year], month: params[:month])
  end

  def budget_params
    params.require(:budget).permit(:monthly_income)
  end
end

class BudgetsController < ApplicationController
  helper_method :budget
  respond_to :json, only: %w{show}

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
    @budget = current_user.budgets.find(params[:id])
    if @budget.update_attributes(budget_params)
      flash[:notice] = "Updated budget"
    else
      flash[:notice] = "something went wrong!"
    end
  end

  private

  def budget
    @budget ||= current_user.budgets
                            .includes(:budget_categories, :budget_items, :budget_item_expenses)
                            .find_by(year: params[:year], month: params[:month])
  end

  def budget_params
    params.require(:budget).permit(:monthly_income)
  end
end

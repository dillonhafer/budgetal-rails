class BudgetsController < AuthenticatedController
  helper_method :budget, :updated_budget
  respond_to :json, only: %w{show update}

  def update
    if budget.update({monthly_income: params[:monthly_income]})
      flash[:notice] = "Updated budget"
      render :show
    else
      render json: { errors: budget.errors}, status: 422
    end
  end

  private

  def budget
    budget_scope = current_user.budgets.includes(:budget_categories, :budget_items, :budget_item_expenses)
    @budget ||= if params[:id]
                  budget_scope.find(params[:id])
                else
                  budget_scope.find_by(year: params[:year], month: params[:month])
                end
  end
end

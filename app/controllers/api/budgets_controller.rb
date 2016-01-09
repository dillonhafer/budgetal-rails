class Api::BudgetsController < AuthenticatedController
  helper_method :budget, :updated_budget
  respond_to :json, only: %w{show update}

  def show
    respond_with budget
  end

  def update
    if updated_budget.update_attributes(budget_params)
      flash[:notice] = "Updated budget"
      render :budget
    else
      render json: { errors: updated_budget.errors}, status: 422
    end
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

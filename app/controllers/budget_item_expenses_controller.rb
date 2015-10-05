class BudgetItemExpensesController < AuthenticatedController
  respond_to :html, :js, :json
  helper_method :budget_item_expense

  def create
    if budget_item_expense.save
      render :budget_item_expense
    else
      render json: { errors: budget_item_expense.errors }, status: 422
    end
  end

  def update
    if budget_item_expense.update_attributes(budget_item_expense_params)
      render :budget_item_expense
    else
      render json: { errors: budget_item_expense.errors }, status: 422
    end
  end

  def destroy
    budget_item_expense.destroy
    respond_with budget_item_expense
  end

  private

  def budget_item_expense
    @budget_item_expense ||= if params[:id]
      current_user.budget_item_expenses.find(params[:id])
    else
      current_user.budget_items.find(params[:budget_item_expense][:budget_item_id]).budget_item_expenses.new(budget_item_expense_params)
    end
  end

  def budget_item_expense_params
    params.require(:budget_item_expense).permit(
      :budget_item_id,
      :name,
      :date,
      :amount
    )
  end
end

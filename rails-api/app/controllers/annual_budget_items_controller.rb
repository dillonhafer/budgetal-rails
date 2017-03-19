class AnnualBudgetItemsController < AuthenticatedController
  helper_method :budget_item

  def create
    @budget_item = current_user.annual_budgets
                       .find(params[:annual_budget_item][:annual_budget_id])
                       .annual_budget_items
                       .new(budget_item_params)
    if budget_item.save
      render budget_item
    else
      render json: { errors: budget_item.errors }, status: 422
    end
  end

  def update
    if budget_item.update(budget_item_params)
      render budget_item
    else
      render json: { errors: budget_item.errors }, status: 422
    end
  end

  def destroy
    if budget_item.destroy
      render json: { success: true }
    else
      render json: { success: false, message: "Could not delete #{budget_item.name}" }, status: 422
    end
  end

  private

  def budget_item
    id = params[:annual_budget_item].fetch(:id, params[:id])
    @budget_item ||= current_user.annual_budget_items.find(id)
  end

  def budget_item_params
    params.require(:annual_budget_item).permit(:name, :due_date, :paid, :amount, :payment_intervals)
  end
end

class AllocationPlanBudgetItemsController < AuthenticatedController
  def create
    if item.save
      render json: item
    else
      render json: { errors: item.errors }, status: 422
    end
  end

  def update
    if item.update_attributes(item_params)
      render json: item
    else
      render json: { errors: item.errors }, status: 422
    end
  end

  private

  def item
    @item ||= if params[:id]
      current_user.allocation_plan_budget_items.find(params[:id])
    else
      new_item = allocation_plan.allocation_plan_budget_items.new
      new_item.attributes = item_params
      new_item.budget_item = budget_item
      new_item
    end
  end

  def allocation_plan
    @allocation_plan ||= current_user.allocation_plans.find(params[:allocation_plan_budget_item][:allocation_plan_id])
  end

  def budget_item
    @budget_item ||= current_user.budget_items.find(params[:allocation_plan_budget_item][:budget_item_id])
  end

  def item_params
    params.require(:allocation_plan_budget_item).permit(:amount_budgeted)
  end
end
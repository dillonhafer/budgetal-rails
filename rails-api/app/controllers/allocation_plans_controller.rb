class AllocationPlansController < AuthenticatedController
  helper_method :budget, :allocation_plan

  def show
    render allocation_plan
  end

  def create
    if allocation_plan.save
      puts "CREATED #{allocation_plan.to_json}"
      render allocation_plan
    else
      render json: { errors: allocation_plan.errors }, status: 422
    end
  end

  def update
    if allocation_plan.update_attributes(allocation_plan_params)
      render allocation_plan
    else
      render json: { errors: allocation_plan.errors }, status: 422
    end
  end

  private

  def allocation_plan
    @allocation_plan ||= if params[:id]
      current_user.allocation_plans.find(params[:id])
    else
      plan = budget.allocation_plans.new
      plan.attributes = allocation_plan_params if params[:allocation_plan]
      plan
    end
  end

  def budget
    year    = params[:year]
    month   = params[:month]
    @budget ||= current_user.budgets.includes(:allocation_plans, :budget_categories, :budget_items, :allocation_plan_budget_items).find_by(month: month, year: year) || Budget.create_template(month, year, current_user.id)
  end

  def allocation_plan_params
    params.require(:allocation_plan).permit(:month, :start_date, :end_date, :income, allocation_plan_budget_items_attributes: [:id, :amount_budgeted, :budget_item_id, :allocation_plan_id] )
  end
end
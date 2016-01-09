class Api::AllocationPlansController < AuthenticatedController
  before_filter :check_date, except: [:edit, :show]
  helper_method :budget, :allocation_plan

  def show
    render allocation_plan
  end

  def create
    if allocation_plan.save
      render json: allocation_plan
    else
      render json: { errors: allocation_plan.errors }, status: 422
    end
  end

  def update
    if allocation_plan.update_attributes(allocation_plan_params)
      render json: allocation_plan
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

  def check_date
    error = if year_too_great?(params[:year])
              "You can't go that far into the future. Who's to say we'd still be around?"
            elsif year_too_small?(params[:year])
              "We didn't exist back then, I don't think you'll find a budget there."
            elsif invalid_month?(params[:month])
              "You do know there are only 12 months in a year right?"
            end

    redirect_to root_path, notice: error unless error.blank?
  end

  def year_too_great?(year)
    year.to_i > 1.year.from_now.year
  end

  def year_too_small?(year)
    year.to_i < 2013
  end

  def invalid_month?(month)
    (1..12).exclude?(month.to_i)
  end
end

class AllocationPlansController < AuthenticatedController
  before_filter :check_date, except: [:edit]
  helper_method :budget, :allocation_plan

  def new
    render layout: !request.xhr?
  end

  def create
    allocation_plan.attributes = allocation_plan_params
    if allocation_plan.save
      'Added pay period'
    else
      'Something went wrong'
    end
    redirect_to my_allocation_plans_path(month: budget.month, year: budget.year), notice: notice
  end

  def edit
    render layout: !request.xhr?
  end

  def update
    notive = if allocation_plan.update_attributes(allocation_plan_params)
      'Updated pay period'
    else
      'Something went wrong'
    end
    redirect_to my_allocation_plans_path(month: budget.month, year: budget.year), notice: notice
  end

  private

  def allocation_plan
    @allocation_plan ||= if params[:id]
      current_user.allocation_plans.find(params[:id])
    else
      budget.allocation_plans.new
    end
  end

  def budget
    year    = params[:year]
    month   = params[:month]
    @budget ||= current_user.budgets.includes(:budget_categories).find_by(month: month, year: year) || Budget.create_template(month, year, current_user.id)
  end

  def allocation_plan_params
    params.require(:allocation_plan).permit(:month, :start_date, :end_date, :income, allocation_plan_budget_items_attributes: [:id, :amount_budgeted, :budget_item_id, :allocation_plan_id] )
  end

  def check_date
    if params[:year].to_i > 2020
      flash[:error] = "You can't go that far into the future. Who's to say we'd still be around?"
      redirect_to root_path
    elsif params[:year].to_i < 2013
      flash[:error] = "We didn't exist back then, I don't think you'll find a budget there."
      redirect_to root_path
    elsif !(1..12).include?(params[:month].to_i)
      flash[:error] = "You do know there are only 12 months in a year right?"
      redirect_to root_path
    end
  end
end

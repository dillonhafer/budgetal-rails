class AllocationPlansController < AuthenticatedController
  before_filter :check_date, except: [:edit]
  before_filter :find_budget, only: %w{index create update}

  layout 'budget_categories'
  
  def new
    @new_allocation_plan = AllocationPlan.new
    render layout: !request.xhr?
  end
  
  def index    
    @budgets = []
    (1..12).each do |month|
      @budgets << OpenStruct.new(month: month, year: Date.today.year)
    end

    @new_allocation_plan = AllocationPlan.new
  end

  def create    
    @allocation_plan = @budget.allocation_plans.new(allocation_plan_params)
    if @allocation_plan.save
      redirect_to my_allocation_plans_path(month: @budget.month, year: @budget.year), notice: 'Added pay period'
    else
      redirect_to my_allocation_plans_path(month: @budget.month, year: @budget.year), notice: 'Something went wrong'
    end
  end

  def edit
    @allocation_plan = AllocationPlan.find(params[:id])
    render layout: !request.xhr?
  end

  def update
    @allocation_plan = @budget.allocation_plans.find(params[:id])
    if @allocation_plan.update_attributes(allocation_plan_params)
      redirect_to my_allocation_plans_path(month: @budget.month, year: @budget.year), notice: 'Added pay period'
    else
      redirect_to my_allocation_plans_path(month: @budget.month, year: @budget.year), notice: 'Something went wrong'
    end
  end

  def destroy
    @budget_category = BudgetCategory.find(params[:id])
    @budget_category.destroy    
  end

  private

  def find_budget
    year    = params[:year]
    month   = params[:month]
    @budget = current_user.budgets.where(month: month.to_s, year: year.to_s).first || Budget.create_template(month, year, current_user.id)
  end

  def allocation_plan_params
    params.require(:allocation_plan).permit(:month, :id, :start_date, :end_date, :income, allocation_plan_budget_items_attributes: [:id, :amount_budgeted, :budget_item_id, :allocation_plan_id] )
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

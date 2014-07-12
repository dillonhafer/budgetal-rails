class BudgetCategoriesController < ApplicationController
  before_filter :require_user  
  before_filter :check_date
  before_filter :check_user, only: [:cajax]

  def index    
    year  = params[:year]
    month = params[:month]      
    @budget = current_user.budgets.find_by(month: month.to_s, year: year.to_s) || Budget.create_template(month, year, current_user.id)
  end

  def cajax
    @c = BudgetCategory.find(params[:id])    
  end

  def update
    @c = BudgetCategory.find(params[:id])    
    if @c.update_attributes(budget_category_params)
      flash[:notice] = 'Changes saved!'
    else
      flash[:error] = 'Something went wrong'
    end
  end

   def destroy
    @budget_category = BudgetCategory.find(params[:id])
    @budget_category.destroy    
  end

  private

  def check_user
    @c = BudgetCategory.find(params[:id])
    #if !@c.blank? && @c.budget.user_id != current_user.id
    #  if request.xhr?
    #    render(js: '$(".category-ajax").html("<h1 class=\'error-404 text-center\'>404 not found</h1>")') and return
    #  end
    #else
    #  if request.xhr?
    #    render(js: '$(".category-ajax").html("<h1 class=\'error-404 text-center\'>404 not found</h1>")') and return
    #  end
    #end
  end

  def budget_category_params
    params.require(:budget_category).permit(:name, 
      :amount, 
      budget_items_attributes: [
        :id, 
        :envelope, 
        :name, 
        :amount_budgeted, 
        :_destroy,
        budget_item_expenses_attributes: [
          :id,
          :date,
          :amount,
          :name,
          :_destroy
        ]
      ])
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

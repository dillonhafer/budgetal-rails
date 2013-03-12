class HomeController < ApplicationController
  before_filter :require_user
  before_filter :raise_hell

  def index
    @budgets = Budget.where(:user_id => current_user.id).order :id
    @budget = Budget.where(id: params[:budget_id].to_i, user_id: current_user.id).first if params[:budget_id]

    if @budget
      @date = Date.new( 1, @budget.id).strftime("%B")
      
      amount_budgeted = 0.00
      @budget.budget_categories.each do |bc|
        amount_budgeted += bc.budget_items.sum(:amount_budgeted)      
      end
      
      @budget_remaining = @budget.monthly_income - amount_budgeted
      used = (100 - (@budget_remaining / @budget.monthly_income * 100).to_i)
      @percentage_used = used > 100 ? 100 : used
    end
  end  

  def raise_hell
    budget = Budget.find(params[:budget_id]) if params[:budget_id]
    
    if budget && budget.user_id != current_user.id
      redirect_to logout_path
    end
  end
end

class HomeController < ApplicationController
  before_filter :require_user
  before_filter :raise_hell

  def index
    @budgets = Budget.where(:user_id => current_user.id).order("month::integer")
    @budget = Budget.where(id: params[:budget_id].to_i, user_id: current_user.id).first if params[:budget_id]

    if @budget
      @date = Date.new( 1, @budget.month.to_i).strftime("%B")
      amount_budgeted = Budget.where(id: @budget.id, user_id: current_user.id).joins(:budget_items).sum(:amount_budgeted).to_f      
      @budget_remaining = @budget.monthly_income.to_f - amount_budgeted
      used = (100 - (@budget_remaining / @budget.monthly_income.to_f * 100))
      @percentage_used = used > 100 ? 100 : used
    end
  end  

  def raise_hell
    budget = Budget.find(params[:budget_id]) if params[:budget_id]
    
    if budget && budget.user_id != current_user.id
      if request.xhr?
        render :js => "window.location = '#{logout_path}'"
      else        
        redirect_to logout_path
      end
    end
  end
end

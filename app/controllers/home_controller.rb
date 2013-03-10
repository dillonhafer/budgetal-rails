class HomeController < ApplicationController
  def index
    @budgets = Budget.order :id

    if params[:budget_id].present?
      @budget = Budget.find params[:budget_id]
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
end

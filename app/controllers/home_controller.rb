class HomeController < ApplicationController
  before_filter :require_user  

  def index
    year  = params[:year] || Date.today.year
    month = params[:month] || Date.today.month
    
    @budgets = []

    (1..12).each do |month|
      @budgets << {month: month, year: Date.today.year}
    end

    @budget = current_user.budgets.where(month: month.to_s, year: year.to_s).first

    unless @budget
      @budget = Budget.create_template(month, year, current_user.id)
      @amount_spent = 0      
      @date = Date.new(year.to_i, month.to_i, 1)
      @budget_remaining = 0.00
      @percentage_used = 100
    else
      @amount_spent = @budget.total_expenses      
      amount_budgeted = current_user.budgets.where(id: @budget.id).joins(:budget_items).sum(:amount_budgeted).to_f
      @date = Date.new( 1, @budget.month.to_i).strftime("%B")
      @budget_remaining = @budget.monthly_income.to_f - amount_budgeted
      used = (100 - (@budget_remaining / @budget.monthly_income.to_f * 100))
      @percentage_used = used > 100 ? 100 : used    
    end
  end
end

class HomeController < ApplicationController
  before_filter :require_user  

  def index
    year = params[:year] || Date.today.year
    month = params[:month] || Date.today.month

    @budgets = current_user.budgets.order("month::integer")
    @budget = @budgets.where(month: month.to_s, year: year.to_s).first

    if @budget
      @amount_spent = @budget.total_expenses
      @date = Date.new( 1, @budget.month.to_i).strftime("%B")
      amount_budgeted = current_user.budgets.where(id: @budget.id).joins(:budget_items).sum(:amount_budgeted).to_f
      @budget_remaining = @budget.monthly_income.to_f - amount_budgeted
      used = (100 - (@budget_remaining / @budget.monthly_income.to_f * 100))
      @percentage_used = used > 100 ? 100 : used
    end
  end
end

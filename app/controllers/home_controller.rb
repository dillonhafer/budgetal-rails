class HomeController < ApplicationController
  def index
    @budgets = Budget.order :id

    if params[:budget_id].present?
      @budget = Budget.find params[:budget_id]
      @date = Date.new( 1, @budget.id).strftime("%B")
    end
  end
end

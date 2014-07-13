class MonthlyStatisticsController < ApplicationController
  before_filter :require_user
    
  def index
  end

  def show
    @date   = Date.new(params[:year].to_i, params[:month].to_i).strftime("%B %Y")
    @budget = current_user.budgets.where(month: params[:month], year: params[:year]).first
  end

  def chart
    render layout: false
  end
end

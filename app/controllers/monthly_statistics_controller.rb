class MonthlyStatisticsController < ApplicationController
  before_filter :require_user

  def index
  end

  def show
    @date = Date.new(params[:year].to_i, params[:month].to_i).strftime("%B %Y")
    @budget = Budget.find_by_month(params[:month])
  end
end

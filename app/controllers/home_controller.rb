class HomeController < ApplicationController
  before_filter :require_user  

  def index
    year  = params[:year]  || Date.today.year
    month = params[:month] || Date.today.month
    
    @budgets = []
    (1..12).each do |month|
      @budgets << OpenStruct.new(month: month, year: Date.today.year)
    end

    @budget = current_user.budgets.where(month: month.to_s, year: year.to_s).first || Budget.create_template(month, year, current_user.id)
  end  
end

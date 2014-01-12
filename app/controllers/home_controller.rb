class HomeController < ApplicationController
  before_filter :require_user  
  before_filter :check_date  

  def index
    year  = params[:year]
    month = params[:month]
    
    @budgets = []
    (1..12).each do |month|
      @budgets << OpenStruct.new(month: month, year: Date.today.year)
    end

    @budget = current_user.budgets.where(month: month.to_s, year: year.to_s).first || Budget.create_template(month, year, current_user.id)
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

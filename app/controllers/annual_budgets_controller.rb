class AnnualBudgetsController < ApplicationController
  before_filter :require_user

  def index
    @annual_budget = current_user.annual_budgets.find_or_create_by(year: year_param)
  end

  private

  def year_param
    year       = params[:year].to_i
    year_limit = Date.today.advance(years: 2).year

    if (2015..year_limit).include?(year)
      year
    else
      Date.today.year
    end
  end
end

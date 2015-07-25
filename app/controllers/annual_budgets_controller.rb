class AnnualBudgetsController < ApplicationController
  before_filter :require_user

  respond_to :html, :json

  def index
    @annual_budget = current_user.annual_budgets
                                 .includes(:annual_budget_items)
                                 .find_or_create_by(year: year_param)
    respond_to do |f|
      f.html
      f.json {respond_with @annual_budget, include: :annual_budget_items}
    end
  end

  def update
    @annual_budget = current_user.annual_budgets.includes(:annual_budget_items).find(params[:id])
    flash[:notice] = if @annual_budget.update_attributes(annual_budget_params)
                       "Saved budget items"
                     else
                       "Something went wrong"
                     end
  end

  private

  def annual_budget_params
    params.require(:annual_budget).permit(
      annual_budget_items_attributes: [
        :id,
        :name,
        :amount,
        :due_date,
        :paid,
        :_destroy
      ])
  end

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

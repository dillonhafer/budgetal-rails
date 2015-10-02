class BudgetCategoriesController < AuthenticatedController
  include ActionView::Helpers::TextHelper

  before_filter :check_date, except: [:copy]
  helper_method :budget_category, :budget
  respond_to :json, :html, :js

  def show
    respond_with budget_category
  end

  def copy
    budget_category.copy_previous_items

    flash[:notice] = if budget_category.import_count > 0
      "Finished importing #{pluralize budget_category.import_count, 'item'}"
    else
      "There wasn't anything to import."
    end
    respond_with budget_category
  end

  private

  def budget
    year  = params[:year]
    month = params[:month]
    @budget ||= current_user.budgets.includes(:budget_categories).find_by(month: month.to_s, year: year.to_s) || Budget.create_template(month, year, current_user.id)
  end

  def budget_category
    @budget_category ||= current_user.budget_categories.includes(:budget, :budget_items, :budget_item_expenses).find(category_id)
  end

  def category_id
    params[:id] == 'undefined' ? budget.budget_categories.first.id : params[:id]
  end

  def check_date
    year  = params[:year].to_i
    month = params[:month].to_i
    if year > Time.now.advance(years: 1).year
      flash[:error] = "You can't go that far into the future. Who's to say we'd still be around?"
      redirect_to root_path
    elsif year < 2013
      flash[:error] = "We didn't exist back then, I don't think you'll find a budget there."
      redirect_to root_path
    elsif !(1..12).include?(month)
      flash[:error] = "You do know there are only 12 months in a year right?"
      redirect_to root_path
    end
  end
end

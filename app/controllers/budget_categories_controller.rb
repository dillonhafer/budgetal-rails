class BudgetCategoriesController < AuthenticatedController
  include ActionView::Helpers::TextHelper
  before_filter :check_date, except: [:import, :show]
  helper_method :budget_category, :budget, :message, :imported_items

  respond_to :json

  private

  def imported_items
    @imported_items ||= budget_category.copy_previous_items
  end

  def message(imported_size=0)
    @message ||= if imported_size > 0
      "Finished importing #{pluralize imported_size, 'item'}"
    else
      "There wasn't anything to import."
    end
  end

  def budget
    year  = params[:year]
    month = params[:month]
    @budget ||= current_user.budgets.includes(:budget_categories).find_by(month: month, year: year) || Budget.create_template(month, year, current_user.id)
  end

  def budget_category
    @budget_category ||= current_user.budget_categories.includes(:budget, :budget_items, :budget_item_expenses).find(category_id)
  end

  def category_id
    params[:id] == 'undefined' ? budget.budget_categories.first.id : params[:id]
  end

  def check_date
    year  = params[:year].to_i
    error = if year_too_great?(params[:year])
              "You can't go that far into the future. Who's to say we'd still be around?"
            elsif year_too_small?(params[:year])
              "We didn't exist back then, I don't think you'll find a budget there."
            elsif invalid_month?(params[:month])
              "You do know there are only 12 months in a year right?"
            end

    unless error.blank?
      flash[:error] = error
      redirect_to root_path
    end
  end

  def year_too_great?(year)
    year.to_i > 1.year.from_now.year
  end

  def year_too_small?(year)
    year.to_i < 2013
  end

  def invalid_month?(month)
    (1..12).exclude?(month.to_i)
  end
end

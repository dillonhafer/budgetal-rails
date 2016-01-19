class Api::BudgetCategoriesController < AuthenticatedController
  include ActionView::Helpers::TextHelper
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
end
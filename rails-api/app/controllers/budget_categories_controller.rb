class BudgetCategoriesController < AuthenticatedController
  helper_method :budget_category, :budget, :message, :imported_items
  respond_to :json

  private

  def imported_items
    category = current_user.budget_categories.find_by(id: params[:id]) || OpenStruct.new(copy_previous_items:[])
    @imported_items ||= category.copy_previous_items
  end

  def message(imported_size=0)
    @message ||= if imported_size > 0
      plural = imported_size > 1 ? 'items' : 'item'
      "Finished importing #{imported_size} #{plural}"
    else
      "There wasn't anything to import."
    end
  end

  def budget
    year  = params[:year]
    month = params[:month]
    @budget ||= current_user.budgets.includes(budget_categories: {budget_items: :budget_item_expenses}).find_by(month: month, year: year) || Budget.create_template(month, year, current_user.id)
  end

  def budget_category
    cat_id = category_id
    @budget_category ||= current_user.budget_categories.includes(:budget).find(cat_id)
  end

  def category_id
    if params[:id] == 'undefined'
      @budget_category = budget.budget_categories.first
      @budget_category.id
    else
      params[:id]
    end
  end
end

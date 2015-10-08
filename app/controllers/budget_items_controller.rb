class BudgetItemsController < AuthenticatedController
  respond_to :html, :js, :json
  helper_method :budget_item

  def create
    if budget_item.save
      render :budget_item
    else
      render json: { errors: budget_item.errors }, status: 422
    end
  end

  def update
    if budget_item.update_attributes(budget_item_params)
      render :budget_item
    else
      render json: { errors: budget_item.errors }, status: 422
    end
  end

  def destroy
    budget_item.destroy
    respond_with budget_item
  end

  def move_item
    budget_item.update_attributes(budget_category_id: category.id)
    render json: {message: "Moved #{budget_item.name} to #{category.name}"}
  end

  private

  def budget_item
    @budget_item ||= if params[:id]
      current_user.budget_items.find(params[:id])
    else
      category.budget_items.new(budget_item_params)
    end
  end

  def category
    @category ||= current_user.budget_categories.find(params[:budget_category_id])
  end

  def budget_item_params
    params.require(:budget_item).permit(
      :envelope,
      :name,
      :amount_budgeted
    )
  end
end

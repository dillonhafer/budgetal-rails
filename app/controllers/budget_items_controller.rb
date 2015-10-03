class BudgetItemsController < AuthenticatedController
  respond_to :html, :js, :json

  def create
    category = current_user.budget_categories.find(params[:budget_category_id])
    item = category.budget_items.new(budget_item_params)

    if item.save
      render json: item
    else
      render json: { errors: item.errors }, status: 422
    end
  end

  def update
    item = current_user.budget_items.find(params[:id])
    if item.update_attributes(budget_item_params)
      render json: item
    else
      render json: { errors: item.errors }, status: 422
    end
  end

  def destroy
    @item = current_user.budget_items.find(params[:id])
    flash[:notice] = "Deleted #{@item.name}"
    @item.destroy
  end

  def move_item
    category   = current_user.budget_categories.find(params[:move_category_id])
    @item      = current_user.budget_items.find(params[:move_item_id])
    @original_category = @item.budget_category
    @item.update_attributes(budget_category_id: category.id)
    flash[:notice] = "Moved #{@item.name} to #{category.name}"
  end

  private

  def budget_item_params
    params.require(:budget_item).permit(
      :envelope,
      :name,
      :amount_budgeted
    )
  end
end

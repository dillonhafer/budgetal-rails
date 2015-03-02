class BudgetItemsController < ApplicationController
  before_filter :require_user
  respond_to :html, :js

  def new
    category = current_user.budget_categories.find(params[:budget_category_id])
    @item = category.budget_items.new
  end

  def create
    category = current_user.budget_categories.find(params[:budget_category_id])
    @item = category.budget_items.new(budget_item_params)
    if @item.save
      flash[:notice] = "Added #{@item.name}"
    else
      flash[:notice] = 'Something went wrong'
    end
    render :update
  end

  def update
    @item = current_user.budget_items.find(params[:id])
    if @item.update_attributes(budget_item_params)
      flash[:notice] = "Updated #{@item.name}"
    else
      flash[:notice] = 'Something went wrong'
    end
  end

  def destroy
    @item = current_user.budget_items.find(params[:id])
    flash[:notice] = "Deleted #{@item.name}"
    @item.destroy
  end

  private

  def budget_item_params
    params.require(:budget_item).permit(
      :id,
      :envelope,
      :name,
      :amount_budgeted,
      budget_item_expenses_attributes: [
        :id,
        :date,
        :amount,
        :name,
        :_destroy
      ]
    )
  end
end

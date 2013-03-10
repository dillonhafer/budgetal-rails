class BudgetItemsController < ApplicationController
  
  def update
    bi = BudgetItem.find params[:id]
    if bi.update_attributes params[:budget_item]
      respond_to do |format|
        format.html { redirect_to root_path(budget_id: budget_id), notice: 'Updated Budget Item' }
        format.json { flash[:notice] = "Updated Budget Item" }
      end
    else
      respond_to do |format|
        format.html { flash[:error] = "Something went wrong!"; redirect_to root_path(budget_id: budget_id) }
        format.json { flash[:error] = "Something went wrong!"; }
      end
    end
  end

  def budget_id
    BudgetItem.find(params[:id]).budget_category.budget.id
  end
end

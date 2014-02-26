class BudgetCategoriesController < ApplicationController
  def edit
    @budget_category = BudgetCategory.find(params[:id])
  end

  def update
    @budget_category = BudgetCategory.find(params[:id])
    if @budget_category.update_attributes(budget_category_params)
      flash[:notice] = 'Updated!'
    else
      flash[:error] = 'Something went wrong'
    end
  end

   def destroy
    @budget_category = BudgetCategory.find(params[:id])
    @budget_category.destroy    
  end

  private

  def budget_category_params
    params.require(:budget_category).permit(:name, 
      :amount, 
      budget_items_attributes: [
        :id, 
        :envelope, 
        :name, 
        :amount_budgeted, 
        :_destroy,
        budget_item_expenses_attributes: [
          :id,
          :date,
          :amount,
          :name,
          :_destroy
        ]
      ])
  end
end

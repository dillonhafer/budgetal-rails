class BudgetItemExpensesController < ApplicationController

  def create
    @bi = BudgetItemExpense.new params[:budget_item_expense]
    if @bi.save
      respond_to do |format|
        format.html { redirect_to my_budgets_path(budget_id: @bi.budget_item.budget_category.budget.id, was_budget: 'true', c_id: @bi.budget_item.id); flash[:notice] = 'Created Budget Item Expense' }
        format.json { flash[:notice] = "Created Budget Item Expense" }
      end
    else
      respond_to do |format|
        format.html { flash[:error] = "Something went wrong!"; redirect_to my_budgets_path(budget_id: @bi.budget_item.budget_category.budget.id) }
        format.json { flash[:error] = "Something went wrong!"; }
      end
    end
  end

  def update
    bi = BudgetItemExpense.find params[:id]
    if bi.update_attributes params[:budget_item_expense]
      respond_to do |format|
        format.html { redirect_to my_budgets_path(budget_id: bi.budget_item.budget_category.budget.id), notice: 'Updated Budget Item Expense' }
        format.json { flash[:notice] = "Updated Budget Item Expense"; }
      end
    else
      respond_to do |format|
        format.html { flash[:error] = "Something went wrong!"; redirect_to my_budgets_path(budget_id: bi.budget_item.budget_category.budget.id) }
        format.json { flash[:error] = "Something went wrong!"; }
      end
    end
  end

  def destroy
    bi = BudgetItemExpense.find params[:id]
    b_id = bi.budget_item.budget_category.budget.id
    c_id = bi.budget_item.id
    bi.destroy

    respond_to do |format|
      format.html { flash[:notice] = "Deleted Budget Item Expense"; redirect_to my_budgets_path(budget_id: b_id, was_budget: 'true', c_id: c_id) }
      format.json { flash[:notice] = "Deleted Budget Item Expense"; }
    end
  end
end

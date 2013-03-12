class BudgetItemExpensesController < ApplicationController
  before_filter :confirm_correct_user, only: %w{ update destroy }
  #before_filter :confirm_correct_create, only: %w{ create }

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

  def confirm_correct_user
    redirect_to logout_path if BudgetItemExpense.find(params[:id]).budget_item.budget_category.budget.user_id != current_user.id
  end

  def confirm_correct_create
    redirect_to logout_path if BudgetItem.find(params[:budget_item_id][:budget_category_id]).budget_category.budget.user_id != current_user.id
  end
end

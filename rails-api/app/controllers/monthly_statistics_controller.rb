class MonthlyStatisticsController < AuthenticatedController
  helper_method :budget

  respond_to :json

  private

  def budget
    @budget ||= current_user.budgets.includes(:budget_categories).find_by(month: params[:month], year: params[:year]) || Budget.new
  end
end
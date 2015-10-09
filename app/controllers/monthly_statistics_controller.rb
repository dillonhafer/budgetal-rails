class MonthlyStatisticsController < AuthenticatedController
  helper_method :date, :budget

  private

  def date
    @date ||= Date.new(params[:year].to_i, params[:month].to_i).strftime("%B %Y")
  end

  def budget
    @budget ||= current_user.budgets.includes(:budget_categories).find_by(month: params[:month], year: params[:year])
  end
end

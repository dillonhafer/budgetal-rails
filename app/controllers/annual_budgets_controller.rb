class AnnualBudgetsController < AuthenticatedController
  def show
    respond_to do |f|
      f.html
      f.json { respond_with annual_budget, include: :annual_budget_items }
    end
  end

  private

  def annual_budget
    current_user.annual_budgets.includes(:annual_budget_items).find_or_create_by(year: year)
  end

  def year
    allowed_year? ? params[:year] : Date.today.year
  end

  def allowed_year?
    allowed_years.include?(params[:year].to_i)
  end

  def allowed_years
    (2015..Date.today.year+2)
  end
end

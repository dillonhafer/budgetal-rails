
module HomeHelper
  def find_short_month(n)
    Date.new( 1, n).strftime("%b")
  end

  def is_active?(year, month)
    if (year.to_s == params[:year].to_s && month.to_s == params[:month].to_s)
      'active'
    else
      'not-active'
    end
  end

  def page_title(n)
    Date.new( 1, n.to_i).strftime("%B")
  end

  def is_envelope?(budget_item)
    return "<i class='general foundicon-mail blue'></i>".html_safe if budget_item.envelope
  end

  def remaining_to_budget
    if @budget_remaining > 0.00
      "#{number_to_currency @budget_remaining} Remaining to budget"
    elsif @budget_remaining == 0
      "<span style='color:#69F'>Congratulations! Your budget is balanced!</span>".html_safe
    else
      "<span style='color:red'>#{number_to_currency @budget_remaining.abs} Over budget!</span>".html_safe
    end
  end
end

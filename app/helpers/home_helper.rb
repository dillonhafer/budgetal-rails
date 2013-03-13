module HomeHelper
  def find_short_month(n)
    Date.new( 1, n).strftime("%b")
  end

  def is_envelope?(budget_item)
    return "<i class='general foundicon-mail blue'></i>".html_safe if budget_item.envelope
  end
end

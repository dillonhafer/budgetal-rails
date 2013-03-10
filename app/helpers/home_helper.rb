module HomeHelper
  def find_short_month(n)
    Date.new( 1, n).strftime("%b")
  end
end

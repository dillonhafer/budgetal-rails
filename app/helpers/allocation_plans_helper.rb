module AllocationPlansHelper
  def color_for_number(number)
    if number.to_f > 0.00
      'green'
    elsif number.to_f == 0.00
      'blue'
    else
      'red'
    end
  end
end
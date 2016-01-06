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

  def allocation_item(items, id)
    items.detect {|item| item.budget_item_id == id} || OpenStruct.new(id: '', amount_budgeted: 0.00)
  end
end
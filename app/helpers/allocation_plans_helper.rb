module AllocationPlansHelper
  def allocation_item(items, id)
    items.detect {|item| item.budget_item_id == id} || OpenStruct.new(id: '', amount_budgeted: 0.00)
  end
end

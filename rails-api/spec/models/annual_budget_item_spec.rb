require 'rails_helper'

describe AnnualBudgetItem do
  let!(:six_months)    { FactoryGirl.create(:annual_budget_item, due_date: 6.months.from_now) }
  let!(:three_months)  { FactoryGirl.create(:annual_budget_item, due_date: 3.months.from_now) }

  describe '.due_in_6_months' do
    it 'returns annual budget items due in 6 months' do
      due_items = [six_months]

      expect(AnnualBudgetItem.due_in_6_months).to eq due_items
    end
  end
end
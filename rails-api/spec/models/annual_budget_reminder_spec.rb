require 'rails_helper'
require 'support/email_support'

describe AnnualBudgetReminder do
  include EmailSupport

  let!(:six_months)    { FactoryGirl.create(:annual_budget_item, due_date: 6.months.from_now) }
  let!(:doppelgänger)  { FactoryGirl.create(:annual_budget_item, due_date: 6.months.from_now) }
  let!(:three_months)  { FactoryGirl.create(:annual_budget_item, due_date: 3.months.from_now) }

  describe '.send_6_month_reminders' do
    after do
      File.delete("6_month_reminders-#{Date.today}")
    end

    it 'sends emails' do
      expect {
        AnnualBudgetReminder.send_6_month_reminders
      }.to change{emails.size}.by 2
    end

    it 'does not send emails to incorrect people' do
      AnnualBudgetReminder.send_6_month_reminders
      expect(emails.map(&:to)).not_to include three_months.annual_budget.user.email
    end

    it 'is idempotent for 15 hours' do
      expect {
        AnnualBudgetReminder.send_6_month_reminders
      }.to change{emails.size}.by 2

      expect {
        AnnualBudgetReminder.send_6_month_reminders
      }.not_to change{emails.size}
    end
  end
end
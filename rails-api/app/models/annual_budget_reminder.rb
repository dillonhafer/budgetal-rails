class AnnualBudgetReminder
  def self.send_6_month_reminders
    file = "6_month_reminders-#{Date.today}"

    annual_budget_items = AnnualBudgetItem.due_in_6_months.includes(annual_budget: :user).where.not(id: already_ran_ids(file))
    annual_budget_items.each do |item|
      Notifier.due_in_6_months(item).deliver_now
      File.open(file, "a") {|f| f.puts item.id }
    end
  end

  def self.already_ran_ids(file)
    File.readlines(file).map(&:to_i) if File.exists?(file)
  end
end
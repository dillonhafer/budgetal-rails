class NotifierPreview < ActionMailer::Preview
  def new_user
    Notifier.new_user(User.first)
  end

  def due_in_6_months
    Notifier.due_in_6_months(AnnualBudgetItem.first)
  end
end

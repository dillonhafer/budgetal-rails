class Notifier < ApplicationMailer
  attr_reader :user
  helper_method :user

  def new_user(user)
    @user = user
    mail(from: 'no-reply@budgetal.com', to: @user.email, subject: 'Welcome to Budgetal!')
  end

  def due_in_6_months(annual_budget_item)
    @annual_budget_item = annual_budget_item
    @user = annual_budget_item.annual_budget.user
    mail(from: 'no-reply@budgetal.com', to: @user.email, subject: 'Reminder: Upcoming Expense!')
  end
end

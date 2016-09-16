namespace :reminder_emails do
  desc 'Dependancy check'
  task due_in_6_months: :environment do
    AnnualBudgetReminder.send_6_month_reminders
  end
end

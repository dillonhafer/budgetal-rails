require 'rails_helper'
require 'support/email_support'

describe Notifier, type: :mailer do
  include EmailSupport

	describe '#new_user' do
		let(:user)    { FactoryGirl.create(:user)  }

		before { Notifier.new_user(user).deliver_now }

		it 'has the right subject' do
      email = find_last_email_to(user.email)
			expect(find_mail_with_subject("Welcome to Budgetal!")).not_to be_blank
		end

		it 'has the right TO address' do
      email = find_last_email_to(user.email)
			expect(email.to).to eq([user.email])
		end

		it 'has the right FROM address' do
      email = find_last_email_to(user.email)
			expect(email.from).to eq(['no-reply@budgetal.com'])
		end

		it 'has the first name in the email' do
      email = find_last_email_to(user.email)
			expect(email.body).to have_selector('p', text: "Hi #{user.first_name}!")
		end
	end

  describe '#due_in_6_months' do
    let(:annual_budget_item) { FactoryGirl.create(:annual_budget_item, name: 'Insurrance', amount: 98.34, due_date: '2016-10-27') }
    let(:user) { annual_budget_item.annual_budget.user }

    before { Notifier.due_in_6_months(annual_budget_item).deliver_now }

    it 'has the right subject' do
      email = find_last_email_to(user.email)
      expect(find_mail_with_subject("Reminder: Upcoming Expense!")).not_to be_blank
    end

    it 'has the right TO address' do
      email = find_last_email_to(user.email)
      expect(email.to).to eq([user.email])
    end

    it 'has the right FROM address' do
      email = find_last_email_to(user.email)
      expect(email.from).to eq(['no-reply@budgetal.com'])
    end

    it 'has the expense details in the email' do
      email = find_last_email_to(user.email)
      expect(email.body).to have_selector('p', text: "Insurrance ($98.34) is due on October 27")
    end
  end
end

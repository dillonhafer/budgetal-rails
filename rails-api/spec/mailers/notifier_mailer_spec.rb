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
end

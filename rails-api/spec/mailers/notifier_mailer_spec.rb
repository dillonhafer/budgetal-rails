require 'rails_helper'
require 'support/mailer_helper'

describe Notifier, type: :mailer do
	describe '#new_user' do
		let(:user)    { FactoryGirl.create(:user)  }

		before { Notifier.new_user(user).deliver_now }

		it 'has the right subject' do
			expect(first_email.subject).to eq('Welcome to Budgetal!')
		end

		it 'has the right TO address' do
			expect(first_email.to).to eq([user.email])
		end

		it 'has the right FROM address' do
			expect(first_email.from).to eq(['no-reply@budgetal.com'])
		end

		it 'has the first name in the email' do
			expect(first_email.body).to have_selector('p', text: "Hi #{user.first_name}!")
		end
	end
end

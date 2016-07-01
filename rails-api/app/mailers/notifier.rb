class Notifier < ApplicationMailer
  attr_reader :user
  helper_method :user

  def new_user(user)
    @user = user
    mail(from: 'no-reply@budgetal.com', to: @user.email, subject: 'Welcome to Budgetal!')
  end
end

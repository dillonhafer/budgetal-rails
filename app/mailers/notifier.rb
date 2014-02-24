class Notifier < ActionMailer::Base
  def new_user(user)
    @user = user
    mail(:from => "no-reply@budgetal.com", :to => @user.email, :subject => "Welcome to budgetal.com!")
  end
  
  def send_receipt(order)
    @order = order
    mail(:from => "orders@budgetal.com", :to => @order.email, :subject => "Your reciept for order #: #{@order.order_number}")
  end
  
  def password_reset(user)
    @user = user
    mail(:from => "no-reply@budgetal.com", :to => @user.email, :subject => "Password reset")
  end
  
  def push_notification(to, message)
    @message = message
    mail(:from => "text-notifications@budgetal.com", :to => to, :subject => "Action Required")
  end

  def new_website(user)
    @user = user
    mail(:from => "Budgetal <no-reply@budgetal.com>", :to => @user.email, :subject => "We're getting a makeover!")
  end
end

class Notifier < ActionMailer::Base
  def new_user(user)
    @user = user
    mail(:from => "no-reply@intense-money.com", :to => @user.email, :subject => "Welcome to Intense-Money.com!")
  end
  
  def send_receipt(order)
    @order = order
    mail(:from => "orders@intense-money.com", :to => @order.email, :subject => "Your reciept for order #: #{@order.order_number}")
  end
  
  def password_reset(user)
    @user = user
    mail(:from => "no-reply@intense-money.com", :to => @user.email, :subject => "Password reset")
  end
  
  def push_notification(to, message)
    @message = message
    mail(:from => "text-notifications@intense-money.com", :to => to, :subject => "Action Required")
  end
  
end
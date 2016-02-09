class NotifierPreview < ActionMailer::Preview
  def new_user
    Notifier.new_user(User.first)
  end
end

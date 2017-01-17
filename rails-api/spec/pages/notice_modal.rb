class NoticeModal < PageObject
  def has_notice?(text)
    has_selector?(".ant-notification-notice-content", text: text)
  end

  def dismiss
    find(".ant-notification-notice-close").click
  end
end

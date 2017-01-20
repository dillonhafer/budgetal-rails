module Pages
  class NoticeModal < PageObject
    def has_notice?(text)
      has_selector?('i.ant-notification-notice-icon-success') &&
      has_selector?(".ant-notification-notice-content", text: text)
    end

    def has_error?(text)
      has_selector?('i.ant-notification-notice-icon-error') &&
      has_selector?(".ant-notification-notice-content", text: text)
    end

    def dismiss
      find(".ant-notification-notice-close").click
    end
  end
end

module Pages
  class AccountSettingsPage < PageObject
    def on_page?
      has_selector?('h3', text: 'ACCOUNT INFO', count: 1) &&
      has_selector?('h3', text: 'CHANGE PASSWORD', count: 1) &&
      has_selector?('h3', text: 'SESSIONS', count: 1)
    end
  end
end

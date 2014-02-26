module ApplicationHelper
  def sign_in_modal
    content_tag(:div, '', class: 'reveal-modal', id: 'signInUp', data: {reveal:''})
  end
end

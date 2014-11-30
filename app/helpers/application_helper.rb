module ApplicationHelper
  def sign_in_modal
    content_tag(:div, '', class: 'reveal-modal small', id: 'signInUp', data: {reveal:''})
  end

  def color_for_number(number)
    if number.to_f > 0.00
      'green'
    elsif number.to_f == 0.00
      'blue'
    else
      'red'
    end
  end

  def link_to_i(icon, text, path, options={})
    link_to("<i class='fi-icon fi-#{icon}'></i> #{text}".html_safe, path, options)
  end
end

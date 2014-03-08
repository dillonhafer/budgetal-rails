module ApplicationHelper
  def sign_in_modal
    content_tag(:div, '', class: 'reveal-modal', id: 'signInUp', data: {reveal:''})
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
end

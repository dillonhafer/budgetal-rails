module ApplicationHelper 
  def devise_reveal_modals
    reveal_modal('signInUp') +
    reveal_modal('forgotPassword')
  end

  def reveal_modal(id,size='small')
    content_tag(:div, '', class: "reveal-modal #{size}", id: id.to_s, data: {reveal:''})
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

module ApplicationHelper
  def title(word)
    content_for(:title, word)
  end

  def month_name(n)
    Date.new(2012, n.to_i).strftime("%B")
  end

  def devise_reveal_modals
    reveal_modal('signInUp') +
    reveal_modal('forgotPassword')
  end

  def reveal_modal(id,size='small')
    content_tag(:div, '', class: "reveal-modal #{size}", id: id.to_s, data: {reveal:''})
  end

  def link_to_i(icon, text, path, options={})
    link_to("<i class='fi-icon fi-#{icon}'></i> #{text}".html_safe, path, options)
  end
end

module ApplicationHelper
  def webpack_stylesheet_path
    build_path = File.join(Rails.root, 'public', 'assets', '*.css')
    css_files  = Dir[build_path].sort_by(&File.method(:mtime))
    stylesheet = Pathname.new(css_files.last).basename
    "/assets/#{stylesheet}"
  end

  def link_to_i(icon, text, path, options={})
    link_to("<i class='fi-icon fi-#{icon}'></i> #{text}".html_safe, path, options)
  end
end

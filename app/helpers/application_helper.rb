module ApplicationHelper
  def webpack_hash(ext)
    build_path = File.join(Rails.root, 'public', 'assets', "*.#{ext}")
    files      = Dir[build_path].sort_by(&File.method(:mtime))
    asset      = Pathname.new(files.last).basename
    "/assets/#{asset}"
  end

  def webpack_stylesheet_path
    webpack_hash('css')
  end

  def webpack_javascript_path
    webpack_hash('js')
  end

  def link_to_i(icon, text, path, options={})
    link_to("<i class='fi-icon fi-#{icon}'></i> #{text}".html_safe, path, options)
  end
end

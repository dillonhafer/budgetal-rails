module ApplicationHelper
  def webpack_filename
    manifest_path = File.join(Rails.root, 'public', 'assets', 'manifest')
    if File.exists?(manifest_path)
      sha = IO.binread(manifest_path)
      "/assets/main-#{sha}"
    else
      '/assets/main'
    end
  end

  def link_to_i(icon, text, path, options={})
    link_to("<i class='fi-icon fi-#{icon}'></i> #{text}".html_safe, path, options)
  end
end

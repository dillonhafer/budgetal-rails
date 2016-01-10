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
end

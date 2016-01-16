module ApplicationHelper
  def webpack_filename
    manifest_path = File.join(Rails.root, 'public', 'assets', 'manifest')
    if File.exist?(manifest_path)
      sha = IO.binread(manifest_path).chomp
      "/assets/main-#{sha}"
    else
      '/assets/main'
    end
  end
end

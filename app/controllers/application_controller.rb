class ApplicationController < ActionController::Base
  protect_from_forgery

  after_filter :flash_to_headers
  
  def flash_to_headers
    if request.xhr?
      #avoiding XSS injections via flash
      flash_json = Hash[flash.map{|k,v| [k,ERB::Util.h(v)] }].to_json
      response.headers['X-Flash-Messages'] = flash_json
      puts flash
      flash.discard
    end
  end
end

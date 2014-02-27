class ApplicationController < ActionController::Base
  protect_from_forgery

  after_filter :flash_to_headers
  
  def flash_to_headers
    if request.xhr?
      #avoiding XSS injections via flash
      flash_json = Hash[flash.map{|k,v| [k,ERB::Util.h(v)] }].to_json
      response.headers['X-Flash-Messages'] = flash_json      
      flash.discard
    end
  end

  helper_method :current_user

  def require_user
    if current_user.blank?
      redirect_to root_path, :notice => "You must log in"
    end
  end

  def require_admin
    if current_user.blank? || current_user.admin? == false
      flash[:errors] = "You are not authorized. This incident will be reported."
      redirect_to root_path
    end
  end

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end

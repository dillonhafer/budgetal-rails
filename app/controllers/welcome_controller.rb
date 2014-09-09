class WelcomeController < ApplicationController
  before_filter :new_user
    
  def new_user
    @user = User.new
  end

  def sign_in
    @user = User.new
    render layout: false
  end
end

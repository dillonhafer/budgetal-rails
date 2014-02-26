class WelcomeController < ApplicationController
  before_filter :new_user

  def index
  end

  def tos
  end

  def about
  end

  def contact
  end

  def new_user
    @user = User.new
  end

  def sign_in
    @user = User.new
    render layout: false
  end
end

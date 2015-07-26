class AuthenticatedController < ApplicationController
  before_filter :authenticate_user!
  respond_to :html, :json
end

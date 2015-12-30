class WelcomeController < ApplicationController
  def signed_in
    redirect_to root_path, notice: "Signed in successfully."
  end
end

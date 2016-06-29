class TestsController < ActionController::Base
  def setup
    MobileIntegrationTest.setup(params[:test])
    head :ok
  end

  def teardown
    MobileIntegrationTest.teardown(params[:test])
    head :ok
  end

  def reset
    MobileIntegrationTest.reset
    head :ok
  end
end

Rails.application.config.middleware.insert_before 0, "Rack::Cors" do
   allow do
     origins ENV.fetch('CORS', 'localhost:9999').split

     resource '*',
       headers: :any,
       methods: [:get, :post, :put, :patch, :delete]
   end
 end
Rails.application.configure do
  config.google_sign_in.client_id     = ENV['client_id']
  config.google_sign_in.client_secret = ENV['client_secret']
end
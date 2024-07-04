Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['client_id'], ENV['client_secret']
  {
    redirect_uri: 'http://localhost:3000/users/auth/google_oauth2/callback'
  }
end
OmniAuth.config.allowed_request_methods = %i[get]
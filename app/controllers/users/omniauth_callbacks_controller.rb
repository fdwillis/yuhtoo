class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.from_omniauth(request.env['omniauth.auth'])

      if @user.persisted?
        session[:user_id] = @user.id
        flash[:notice] = 'Signed In'
        sign_in_and_redirect @user, event: :authentication
      else
        session[:user_id] = nil
        sign_out(@user)
        flash[:notice] = @user['error']
        redirect_to '/'
      end
  end
end
class ApplicationController < ActionController::Base
	helper_method :current_user

	def index
		
	end

	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id].present?
	end
end

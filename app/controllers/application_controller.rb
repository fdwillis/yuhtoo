class ApplicationController < ActionController::Base
	def destroy
		session[:user_id] = nil
		flash['success'] = 'Signed Out'
		redirect_to '/'
		return
	end

	def feed
		@ideas = Idea.all
	end

	def privacy
	end

	def terms
	end

	def index
		current_user
	end

	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id].present?
	end
end

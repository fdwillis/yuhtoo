class ApplicationController < ActionController::Base
	before_action :current_user
	def destroy
		session[:user_id] = nil
		flash['success'] = 'Signed Out'
		redirect_to '/'
		return
	end

	def reload
    feed
    render :partial => "ideas/ideas"
  end

	def feed
		@ideas = Idea.all.reverse
		#list of niche ideas -> as one becomes displayed remove it from list of others for partial to build out site
		@niches = Niche.all.shuffle
		@experts = Expert.all.shuffle
		@library = Library.all.shuffle
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

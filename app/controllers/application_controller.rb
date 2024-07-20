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
		@ideas = Idea.find_each.sort_by(&:created_at).reverse
		#list of niche ideas -> as one becomes displayed remove it from list of others for partial to build out site
		@niches = Niche.all.shuffle
		@experts = Expert.all.shuffle
		@library = Library.all.shuffle
		@alert = Alert.all.shuffle
	end

	def privacy
	end

	def terms
	end

	def index
		current_user
		feed
	end

	def current_user
		begin
			@current_user ||= User.find(session[:user_id]) if session[:user_id].present?
		rescue Exception => e
			session[:user_id] = nil
		end
	end
end

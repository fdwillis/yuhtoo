class ApplicationController < ActionController::Base
	before_action :current_user
	before_action :check_membership_session

	def check_membership_session
		if params['session'].present?
			if Stripe::Checkout::Session.list_line_items(params['session'])['data'][0]['description'].downcase.include?('lifetime')
				# remove recurring subscription if present
				sessionXemail = Stripe::Checkout::Session.retrieve(params['session'])['customer_details']['email']
				
				@current_user.update(stripeCustomerID: (Stripe::Customer.list({email: sessionXemail})['data'][0]['id']))
			else
				@current_user.update(stripeCustomerID: Stripe::Checkout::Session.retrieve(params['session'])['customer'])
			end
		end
	end

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

		if current_user&.stripeAccountID.present?
			if Stripe::Account.retrieve(current_user&.stripeAccountID)['payouts_enabled']
				@stripeAccountX = Stripe::Account.create_login_link(current_user&.stripeAccountID)
			else
				@stripeAccountX = Stripe::AccountLink.create({
				  account: current_user&.stripeAccountID,
				  refresh_url: "#{request.base_url}/stripe",
				  return_url: "#{request.original_url}",
				  type: 'account_onboarding',
				})
			end
		elsif session[:user_id].present?
			accountX = Stripe::Account.create({
			  country: 'US',
			  email: current_user&.email,
			  controller: {
			    fees: {payer: 'application'},
			    losses: {payments: 'application'},
			    stripe_dashboard: {type: 'express'},
			  },
			  capabilities: {
			    bank_transfer_payments: {requested: true},
			    cashapp_payments: {requested: true},
			    link_payments: {requested: true},
			    us_bank_account_ach_payments: {requested: true},
			    card_payments: {requested: true},
			    transfers: {requested: true},
			  }
			})

			@current_user.update(stripeAccountID: accountX['id'])

			@stripeAccountX = current_user&.stripeAccountID
		end

		history = []

		userIdeas = @current_user&.ideas
		if userIdeas.present?
			userIdeas.each do |ideaX|
				history << {date: ideaX&.created_at, highlight: 'Your idea', message: ' posted to the feed' , linkURL: "/ideas/#{ideaX&.id}" }
			end
		end

		@history = history
	end

	def privacy
	end

	def terms
	end

	def index
		if @current_user&.present?
			feed
			if  @current_user&.stripeCustomerID.present?
				@stripeCustomerPortal = Stripe::BillingPortal::Session.create({
				  customer: @current_user&.stripeCustomerID,
				  return_url: Rails.env.development? ? ENV['demoURL'] : ENV['productionURL'],
				})
			end
			@payoutInfo = @current_user.present? ? @current_user.payoutStatus : {stripeAccountID: 0, stripeCustomerID: 0, commentCount: 0  }
		else
			render layout: 'frontend'
		end
	end

	def membership
		if session[:user_id].present?
			current_user
			feed
			index
		else
			flash[:alert] = 'Please sign up'
			redirect_to user_google_oauth2_omniauth_authorize_path
		end
	end

	def current_user
		begin
			@current_user ||= User.find(session[:user_id]) if session[:user_id].present?
		rescue Exception => e
			session[:user_id] = nil
		end
	end
end

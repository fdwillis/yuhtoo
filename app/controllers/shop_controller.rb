class ShopController < ApplicationController
	def index
		cart
		@products = []
		products = Stripe::Product.list()

		products.auto_paging_each do |productX|
			if productX['active'] == true && productX['metadata']['printfulProduct'].present?
				@products << productX
			end
		end
	end

	def show
		cart
		@product = Stripe::Product.retrieve("prod_#{params['id']}")

		unless @product.present?
			flash[:warning] = "Do Not Edit URLs"
			redirect_to request.referrer
		end
	end

	def addToCart
		params['addToCart']['stripeProduct'].present?

		info = {
	      price: params['addToCart']['size'],
	      quantity: params['addToCart']['quantity'],
	      adjustable_quantity: {
	      	enabled: true
	      }
	    }.to_h
		session['cart'].push(info)
		flash[:success] = 'Added To Cart'
		redirect_to "/shop/#{params['addToCart']['stripeProduct']}"
	end

	def cart
		session['cart'] ||= []
		@quantity = session['cart'].present? ? session['cart'].map{|d|d['quantity'].to_i}.sum : 0
		if session['cart'].present? 
			@cartsession = Stripe::Checkout::Session.create({
			  success_url: "#{request.base_url}/checkout?session={CHECKOUT_SESSION_ID}",
			  line_items: session['cart'],
			  shipping_address_collection: {
			  	allowed_countries: (ISO3166::Country.codes - ['AS', 'CX', 'CC', 'CU', 'HM', 'IR', 'KP', 'MH', 'FM', 'NF', 'MP', 'PW', 'SD', 'SY', 'UM', 'VI'])
			  },
			  customer: session[:user_id].present? ? current_user&.stripeCustomerID : nil,
			  mode: 'payment',
			})
		end

	end

	def checkout
		session['cart'] = nil
		@sessionStripe = Stripe::Checkout::Session.retrieve(params['session'])
	end
end

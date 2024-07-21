class TransactionsController < ApplicationController

	def index
		
	end

	def create
		
		stripeCustomerX = Stripe::Customer.retrieve(@current_user&.stripeCustomerID)
		customerFirstPayMethod = Stripe::Customer.list_payment_methods(@current_user&.stripeCustomerID)['data'][0]['id']
		fullAmount = ((((params['transaction']['amount'].to_i + 1)/(1 - 0.05) * 100) * 0.01).to_f * 100).round
		
		paymentIntent = Stripe::PaymentIntent.create({


		  amount: fullAmount,
		  customer: stripeCustomerX['id'] ,
		  payment_method: customerFirstPayMethod,
		  currency: 'usd',
		  confirm: true,
		  automatic_payment_methods: {enabled: true, allow_redirects: 'never'},
		  description: "$#{params['transaction']['amount'].to_i} went into #{params['transaction']['idea']}",
		  metadata: {
		  	ideaUUID: params['transaction']['idea'], 
		  	stripeAmount: fullAmount,
		  	rawAmount:  params['transaction']['amount'].to_i,
		  }
		})

		if paymentIntent['amount_received'] > 0 
			redirect_to Idea.find_by(uuid: params['transaction']['idea'])
		end

	end

end

# (10.50*0.29)+30
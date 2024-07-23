namespace :process do
  task payouts: :environment do
		 cleanedTops = []

		Stripe::Topup.list().auto_paging_each do |topUpx|
		 	if topUpx['metadata']['paid'] == 'false'
		 		cleanedTops << topUpx
		 	end
		end
		if cleanedTops.present?
			cleanedTops.each do |topUpX|
				# if DateTime.now.to_i > DateTime.strptime(topUpX['expected_availability_date'].to_s,'%s').to_i + 1.day
					transactions = Stripe::PaymentIntent.list()

			 		# budget
			 		budget = transactions.reject{|d|d['metadata']['ideaUUID']!=topUpX['metadata']['ideaUUID']}.map{|d|d['metadata']['rawAmount'].to_i}.sum
			 		# store payout total
			 		payoutAmount = topUpX['amount']
			 		# build buckets

			 		# tier1
			 		tier1 = (payoutAmount * 0.05).to_i
			 		# tier2
			 		tier2 = (payoutAmount * 0.10).to_i
			 		# tier3
			 		tier3 = (payoutAmount * 0.25).to_i

			 		bonuses = (payoutAmount * 0.30).to_i
			 		
			 		yuhTooCut = (payoutAmount * 0.30).to_i

			 		ineligible = 0

			 		eligiblePay = 0
			 		
				 		# payout each transaction by user bucket & its ownership
						transactions.auto_paging_each do |transactionX|
						 	if transactionX['metadata']['ideaUUID'] == topUpX['metadata']['ideaUUID']
						 		customertransactionX = transactionX['customer']
						 		customerFound = Stripe::Customer.retrieve(customertransactionX)
						 		yuhTooUserx = User.find_by(stripeCustomerID: transactionX['customer'])
						 		yuhTooUserxpayoutStatus = yuhTooUserx&.payoutStatus
						 		#get what percent this transaction contributes to overall budget
						 		rawAmount = transactionX['metadata']['rawAmount'].to_i
						 		percentageFromRaw = (rawAmount.to_f/budget.to_f).to_f.round(4)
						 		tier = !yuhTooUserxpayoutStatus.nil? ? (yuhTooUserxpayoutStatus[:tier] == 25 ? tier3 : yuhTooUserxpayoutStatus[:tier] == 10 ? tier2 : yuhTooUserxpayoutStatus[:tier] == 5 ? tier1 : nil) : tier3
						 		stripeAmountToTransfer = (tier*percentageFromRaw)
								paymentXForMeta = Stripe::PaymentIntent.retrieve(transactionX['id'])

								if yuhTooUserx.nil? && !tier.nil?
									sideXAccount = Stripe::Account.retrieve(customerFound['metadata']['side'])

									if sideXAccount['capabilities']['transfers'] == 'active'
										transferWent = Stripe::Transfer.create({
										  amount: (stripeAmountToTransfer.to_i),
										  currency: 'usd',
										  destination: customerFound['metadata']['side'],
										})

										puts "Paid #{(stripeAmountToTransfer.to_i)}"

										#update payment with running payout account from amount
										
										if paymentXForMeta['metadata']['running'].present?
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {running: paymentXForMeta['metadata']['running'].to_i + (stripeAmountToTransfer.to_i).to_i}})
											puts "Payout #{transactionX['id']}"
										else
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {running: (stripeAmountToTransfer.to_i)}})
											puts "Payout #{transactionX['id']}"
										end
										eligiblePay += stripeAmountToTransfer
									else
										if paymentXForMeta['metadata']['forfeit'].present?
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {forfeit: paymentXForMeta['metadata']['forfeit'].to_i + (stripeAmountToTransfer.to_i).to_i}})
											puts "Forfeit #{transactionX['id']}"
										else
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {forfeit: (stripeAmountToTransfer.to_i)}})
											puts "Forfeit #{transactionX['id']}"
										end

										ineligible += stripeAmountToTransfer

							 			puts "No Payout Account - Ineligible - #{stripeAmountToTransfer}"
									end
						 		elsif yuhTooUserxpayoutStatus[:commentCount] == 1 && yuhTooUserxpayoutStatus[:stripeAccountID] == 1 && !tier.nil?
						 			if yuhTooUserxpayoutStatus[:stripeCustomerID] == 1 || yuhTooUserxpayoutStatus[:lifeTime] == 1
								 		#pay above percentage to customer based on their tier of membership & ONLY IF CURRENT STATUS IS ACTIVE
								 		# transferWent = Stripe::Transfer.create({
										#   amount: (stripeAmountToTransfer.to_i),
										#   currency: 'usd',
										#   destination: customerFound['metadata']['side'],
										# })
										puts "Paid #{(stripeAmountToTransfer.to_i)}"

								 		# keep running total on payment intent in new metadata
										if paymentXForMeta['metadata']['running'].present?
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {running: paymentXForMeta['metadata']['running'].to_i + (stripeAmountToTransfer.to_i).to_i}})
											puts "Payout #{transactionX['id']}"
										else
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {running: (stripeAmountToTransfer.to_i)}})
											puts "Payout #{transactionX['id']}"
										end
										eligiblePay += stripeAmountToTransfer
								 	else
								 		if paymentXForMeta['metadata']['forfeit'].present?
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {forfeit: paymentXForMeta['metadata']['forfeit'].to_i + (stripeAmountToTransfer.to_i).to_i}})
											puts "Forfeit #{transactionX['id']}"
										else
											Stripe::PaymentIntent.update(transactionX['id'], {metadata: {forfeit: (stripeAmountToTransfer.to_i)}})
											puts "Forfeit #{transactionX['id']}"
										end

										ineligible += stripeAmountToTransfer

							 			puts "Ineligible - #{stripeAmountToTransfer}"
						 			end
						 		else
						 			if paymentXForMeta['metadata']['forfeit'].present?
										Stripe::PaymentIntent.update(transactionX['id'], {metadata: {forfeit: paymentXForMeta['metadata']['forfeit'].to_i + (stripeAmountToTransfer.to_i).to_i}})
										puts "Forfeit #{transactionX['id']}"
									else
										Stripe::PaymentIntent.update(transactionX['id'], {metadata: {forfeit: (stripeAmountToTransfer.to_i)}})
										puts "Forfeit #{transactionX['id']}"
									end
									ineligible += stripeAmountToTransfer
						 			#NOT PAID
						 			puts "Ineligible - #{stripeAmountToTransfer}"
						 		end 
							end
						end


				 	# 	# bonuses amount to yuhtoo user connect account
				 	# 	transferyuhToo = Stripe::Transfer.create({
						#   amount: bonuses,
						#   currency: 'usd',
						#   description: 'Bonuses'
						#   destination: User&.first&.stripeAccountID,
						# })

				 	# 	ineligiblePlusCut = Stripe::Payout.create({
						#   amount: yuhTooCut,
						#   currency: 'usd',
						#   description: 'YuhToo Payout'
						# })

				 	# 	# remainder creates a transaction back into business bank account where it was likely pulled
						# ineligiblePlusCut = Stripe::Payout.create({
						#   amount: ineligible,
						#   currency: 'usd',
						#   description: 'Ineligible Payout'
						# })
						# # remainder creates a transaction back into business bank account where it was likely pulled
						# remainderCut = Stripe::Payout.create({
						#   amount: (payoutAmount - (bonuses+yuhTooCut+ineligible+eligiblePay)),
						#   currency: 'usd',
						#   description: 'Remainder Payout'
						# })

				 		# update topup to be marked as paid
				 		puts "Payout #{topUpX['amount'].to_i} - YuhTooCut #{yuhTooCut.to_i} - Bonuses #{bonuses.to_i} - Eligible Total #{eligiblePay.to_i} - Ineligible Total #{ineligible.to_i} - Remainder #{(payoutAmount - (bonuses+yuhTooCut+ineligible+eligiblePay)).to_i} "
						# Stripe::Topup.update(topUpX['id'], {metadata: {paid: 'true'}})

				# end
			end
		else
			puts "No Payouts"
		end
  end
end
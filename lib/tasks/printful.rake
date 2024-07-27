namespace :process do
  task orders: :environment do

    begin
      # grap stripe orders
      stripeOrders = Stripe::Checkout::Session.list({limit: 100}).reject{|checkoutSess| checkoutSess['status'] != 'complete'}
      # grab order invoices from orders
      stripeOrders.each do |checkoutSess|
        if checkoutSess['payment_intent'].present?
          orderItems = []
          paymentIntentX = Stripe::PaymentIntent.retrieve(checkoutSess['payment_intent'])


          if checkoutSess['payment_intent'].present? && checkoutSess['shipping_details'].present? && paymentIntentX['metadata']['fulfilled'] != 'true'
            customerInformation = checkoutSess['shipping_details']

            puts "Starting order #{checkoutSess['id']}"

            # grab product lines
            productLines = Stripe::Checkout::Session.list_line_items(checkoutSess['id'])['data']
            productLines.each do |pl|
              if  pl['price']['metadata']["printfulProduct"].present?
              

                # read each product lines printfulID
                @printfulProduct = pl['price']['metadata']["printfulProduct"]
                @printfulVariant = pl['price']['metadata']["printfulVariant"]
                @productLineQuantity = pl['quantity'].to_s

                info = {
                  'product' => @printfulProduct.strip,
                  'variant' => @printfulVariant.strip,
                  'quantity' => @productLineQuantity.strip
                }.to_h

                orderItems.push(info)

                puts "Printful Product: #{@printfulProduct}, Printful Variant: #{@printfulVariant}, Quantity: #{@productLineQuantity}\nCustomer:#{customerInformation}"
              else
                next
              end
            end

            # loaded = Product.printfulOrder(orderItems,customerInformation)
            # puts "RESPONSE: #{loaded}"

            Stripe::PaymentIntent.update(
              checkoutSess['payment_intent'],
              {metadata: {fulfilled: true}},
            )

          else
            puts "Already Fulfilled #{checkoutSess['id']}"

          end
        else
          puts "no payment intent"
          next
        end
      end
      # build printful order from ids
      # submit printful order for fulfillment
    rescue Stripe::CardError => e
      puts "A payment error occurred: #{e.error.message}"
      puts e
    rescue Stripe::InvalidRequestError => e
      puts "An invalid request occurred."
      puts e
    rescue Stripe::StripeError => e
      puts "Another problem occurred, maybe unrelated to Stripe."
      puts e
    else
      puts "No error."
      puts e
    end
    
  end
end
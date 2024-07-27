# curl --location --request GET 'https://api.printful.com/product-templates' \
# --header 'Authorization: Bearer {oauth_token}'

class Product < ApplicationRecord

	# {
	# 	size: 'small',
	# 	color: 'Irish Green'
	# 	printfulProduct: '342682379',
	# 	printfulVariant: '66300cd8242be4'
	# 	name: 'Trapper Rapper Trader Hoodie',
	# }

	def self.printfulProduct(productID, variantID)
		 curlCall0 = `curl --location --request GET 'https://api.printful.com/store/products/#{productID}' \
			--header 'Authorization: Bearer #{ENV['printfulToken']}'`
		 exid = Oj.load(curlCall0)['result']['sync_variants'].reject{|d|d['external_id'] != variantID}
	end

	def self.printfulOrder(orderItems, customerInformation)
		totalItems = []

		orderItems.each do |orderItem|
			productx = Product.printfulProduct(orderItem['product'], orderItem['variant'])[0]
			
			totalItems.push({
		            "sync_variant_id": "#{productx['id']}",
		            "quantity": "#{orderItem['quantity']}"
		        })
		end
		
		curlCall = `curl --location --request POST 'https://api.printful.com/orders?confirm=false' \
		--header 'Authorization: Bearer #{ENV['printfulToken']}' \
		--data-raw '{
		    "recipient": {
		        "name": "#{customerInformation['name']}",
		        "address1": "#{customerInformation['address']['line1']}",
		        "city": "#{customerInformation['address']['city']}",
		        "state_code": "#{customerInformation['address']['state']}",
		        "country_code": "#{customerInformation['address']['country']}",
		        "zip": "#{customerInformation['address']['postal_code']}"
		    },
		    "items": #{totalItems.to_json},
		    "packing_slip": {
		        "email": "fdwillis@oarlin.com",
		        "phone": "414-265-6608",
		        "message": "Oarlin Merch",
		        "logo_url": "https://dw3i9sxi97owk.cloudfront.net/uploads/stream/2024/03/1115557/30110901/Source-01.jpg"
		    }
		}'`

		Oj.load(curlCall)

	end
end
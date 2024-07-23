class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable#, :trackable , :lockable#,:confirmable, :validatable
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  has_many :comments
  has_many :replies
  has_many :ideas, dependent: :destroy

  FLAGS = ISO3166::Country.countries.map { |c| [c.emoji_flag,c.alpha2, c.iso_short_name, c.currency_code] }

  def payoutStatus
    liveCount = 0
    stripeCustomer = 0
    lifeTime = 0
    stripeAccount = 0
    tier = 0
    
    if stripeCustomerID.present?
      allSessions = Stripe::Checkout::Session.list({customer: stripeCustomerID})

      allSessions.auto_paging_each do |sessionX|
        session0 = Stripe::Checkout::Session.list_line_items(sessionX['id'])

        if session0['data'].map{|d|d['description']}[0].downcase.include?('lifetime')
          stripeCustomer += 1
          lifeTime += 1
          tier += Stripe::Product.retrieve(planX['product'])['metadata']['tier'].to_i
        end
      end

      # paymentIntentsX = Stripe::PaymentIntent.list({customer: stripeCustomerID})
      # paymentIntentsX.auto_paging_each do |paymentX|
      #   unless paymentX['metadata']['rawAmount'].present?
      #     if paymentX['amount'] == 250000 && paymentX['status'] == 'succeeded'
      #       stripeCustomer += 1
      #       lifeTime += 1
      #     end

      #   end
      # end


      allCustomerxPlans = Stripe::Subscription.list({customer: stripeCustomerID})['data'].map(&:plan)
      allCustomerxPlans.each do |planX|
        if planX['active'] == true
          stripeCustomer += 1
          tier += Stripe::Product.retrieve(planX['product'])['metadata']['tier'].to_i
        end
      end
    else
      stripeCustomer = 0
    end

    if self.stripeAccountID.present?
      if Stripe::Account.retrieve(stripeAccountID)['requirements']['currently_due'].count == 0
        if Stripe::Account.retrieve(stripeAccountID)['payouts_enabled']
          stripeAccount += 1
        else
          stripeAccount = 0
        end
      else
        stripeAccount = 0
      end
    end


    return {tier: tier, lifeTime: lifeTime, stripeAccountID: stripeAccount, stripeCustomerID: stripeCustomer, commentCount: comments&.count >= 100 ? 1 : 0  }#.where(approved: true).count
  end


  def self.from_omniauth(access_token)
    data = access_token.info
    if data.email_verified == true
      user = User.where(email: data['email']).first
      # Uncomment the section below if you want users to be created if they don't exist
      user = User.find_or_create_by(email: data['email'],name: data['name'])
      user.update(password: Devise.friendly_token[0,20],auth_token: access_token.credentials.token, fresh_token: access_token.extra.id_token)
      
      unless user&.uuid.present?
         user.update(uuid: SecureRandom.uuid)
      end

      user
    else
      user = {error: 'Please verify your Google account. Or choose a different email.'}
    end
    
    user
	end
end
# "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJhZjkwZTg3YmUxNDBjMjAwMzg4OThhNmVmYTExMjgzZGFiNjAzMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzODI5MTYyNjg3NDEtNG0yYzVjNm50cXIyNnZ1cjVpYXRyYmpuN3NiZWNuMWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzODI5MTYyNjg3NDEtNG0yYzVjNm50cXIyNnZ1cjVpYXRyYmpuN3NiZWNuMWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY3NTE2Njc0NjI0MzE4MTk4OTUiLCJlbWFpbCI6ImZkd2lsbGlzN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImdMWmstY0NaRHBqbC1PY1RaVnhualEiLCJuYW1lIjoiTXIuIE9hcmxpbiAoT2FybGluKSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMX3JjQkJ1UDJBX1lhaFFjY24tWjFGQUd1dmkwTXdlR3R0bFJncWNDMjJtSFQzLWxGQj1zOTYtYyIsImdpdmVuX25hbWUiOiJNci4iLCJmYW1pbHlfbmFtZSI6Ik9hcmxpbiIsImlhdCI6MTcyMDExNTM5MywiZXhwIjoxNzIwMTE4OTkzfQ.ybzquAVGd-44ewSA-n-BViBPrugCEI9Gj3uJZSnjQUCyvIIL92veo603Wk9F5iJt0fERP1hwb8BQbUxPoIj5KpFkiKpBmTBtTEDtgqcpZKvKPghXxHESEvHdmCY5S_oSrIig44BRlJJJaly-SULLaH9nKmxbyFWm7qQ58sbdkgJ7QNiF7t4p-nI-ELq4y-LOa7P14Bo_5NoK80m-wEGeo0X1I209s_QE2Pr33hg3-9EjK3I24BQQLQ_UzV-68gf0vvMveDtNQcCHbRIHTvegArl5P7OhBdlOu7Gm8YBDEh1P4dbe4XGWH4bUChgerghyurA3EewGRcz7dcrfJ9XX4w"



# google account
# account = Yt::Account.new access_token: User.first.auth_token
# user input youtube handle 
# after AI generates suggestions - upload YouTube ID of the video
# people can browse videos with direct link to YT, IG, TikTok, Snapchat
# video = Yt::Video.new id: 'dkApITa_rF4'
# reward community for comments (read sentiment)
# video.comment_threads.map(&:author_display_name)
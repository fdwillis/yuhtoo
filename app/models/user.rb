class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable#, :trackable , :lockable#,:confirmable, :validatable
  devise :omniauthable, omniauth_providers: [:google_oauth2]


  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless user
      user = User.find_or_create_by(email: data['email'],name: data['name'])
      user.update(password: Devise.friendly_token[0,20],auth_token: access_token.credentials.token)
    end
    
    user
	end
end

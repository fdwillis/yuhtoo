Rails.application.routes.draw do
  root "application#index"
  devise_for :users, controllers: {sessions: 'application', omniauth_callbacks: 'users/omniauth_callbacks' }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  resources :ideas
  get 'like/:id/:uuid', to: 'ideas#like'
  get 'unlike/:id/:uuid', to: 'ideas#unlike'

  get 'privacy', to: 'application#privacy'
  get 'terms', to: 'application#terms'
  get 'feed', to: 'application#feed'
  get 'reload-feed' => 'application#reload'
  
  get 'login', to: 'logins#new'
  get 'login/create', to: 'logins#create', as: :create_login
  get 'google_sign_in/callback', to: 'logins#callback', as: :callback_login
end

Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  mount_devise_token_auth_for 'User', at: 'api/v1/authenticate'

  namespace :api do
    namespace :v1 do
      resources :posts
      resources :my_posts, only: [:index]
      resources :sign_in_via_google, only: [:create]
    end
  end
end

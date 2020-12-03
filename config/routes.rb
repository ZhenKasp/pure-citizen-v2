Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/v1/authenticate'
  namespace :api do
    namespace :v1 do
      resources :test, only: %i(index)
    end
  end
end

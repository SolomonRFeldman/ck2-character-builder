Rails.application.routes.draw do
  resources :characters, only: [:index, :show, :create]
  resources :religions, only: [:index]
end

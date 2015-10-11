Fitmap::Application.routes.draw do
  devise_for :users
  devise_scope :user do
    post 'login' => 'sessions#create', :as => 'login'
    post 'logout' => 'sessions#destroy', :as => 'logout'
    get 'current_user' => 'sessions#show_current_user', :as => 'show_current_user'
  end
  
  resources :workouts do
    resources :comments
  end

  root :to => 'static_pages#index'
end

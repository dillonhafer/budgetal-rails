Budgets::Application.routes.draw do
  root :to => 'welcome#index'
  get "/monthly-statistics" => "monthly_statistics#index", as: 'monthly_statistics' 
  get "monthly-statistics/:year(/:month)" => "monthly_statistics#show", as: 'monthly_statistic'

  resources :budgets
  resources :budget_categories
  resources :budget_items
  resources :budget_item_expenses
  resources :sessions
  resources :users, path: 'sign-up'

  get '/edit-my-account' => 'users#edit'
  get '/admin' => 'users#index', as: 'admin'
  match 'sign-up' => 'users#new', as: 'sign_up', via: [:get, :post]
  match '/my-budgets/:year/:month' => 'home#index', as: 'my_budgets', via: [:get, :post]
  resources :home, path: 'my-budgets'
  
  get '/contact' => 'welcome#contact', as: "contact"
  get "/tos" => 'welcome#tos', as: "tos"
  get "/about" => 'welcome#about', as: "about"

  get 'sign-out' => 'sessions#destroy', :as => 'logout'
  get 'sign-in' => 'sessions#create', :as => 'login'
  get 'my-account' => 'users#my_account', :as => 'my_account'
  
  resources :password_resets, path: 'password-resets'
  get "/send-password-reset" => "password_resets#new"  
end

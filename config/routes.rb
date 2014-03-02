Budgets::Application.routes.draw do
  root :to => 'welcome#index'
  
  devise_for :users, path: "sessions", path_names: { sign_in: 'sign-in', sign_out: 'sign-out', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'sign-up', sign_up: 'join' }
  resources :users
  resources :budgets
  resources :budget_categories
  resources :budget_items
  resources :budget_item_expenses  
  
  get 'past-expenses/:name' => 'users#past_expenses', as: 'past_expenses'
  get "/monthly-statistics" => "monthly_statistics#index", as: 'monthly_statistics' 
  get "/monthly-statistics/:year(/:month)" => "monthly_statistics#show", as: 'monthly_statistic'
  
  get '/admin' => 'users#index', as: 'admin'
  get 'my-account' => 'users#my_account', as: 'my_account'
  match '/cash-flow-plans/:year/:month' => 'budget_categories#index', as: 'my_budgets', via: [:get, :post]
end

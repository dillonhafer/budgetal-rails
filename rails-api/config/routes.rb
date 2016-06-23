Budgets::Application.routes.draw do
  root to: 'application#index'

  devise_for :users, path: 'sessions'

  get    '/sessions'          => 'sessions#index'
  post   '/sessions/sign-in'  => 'sessions#create'
  post   '/sessions/sign-up'  => 'registrations#create'
  delete '/sessions/sign-out' => 'sessions#destroy'

  resources :budgets, only: [:update]
  get '/budgets/:year/:month' => 'budgets#show'
  get '/budget-categories/:id/import' => 'budget_categories#import'
  get '/budget-categories/:year/:month/:id' => 'budget_categories#show'
  get '/budget-categories/:id' => 'budget_categories#show'
  match '/cash-flow-plans/:year/:month' => 'budget_categories#index', via: [:get, :post]

  resources :budget_items, path: 'budget-items', only: [:create, :update, :destroy]
  patch '/move-budget-item' => 'budget_items#move_item'

  resources :budget_item_expenses, path: 'budget-item-expenses', only: [:create, :update, :destroy]

  get '/annual-budgets/:year' => 'annual_budgets#show'
  resources :annual_budget_items, path: '/annual-budget-items', only: [:create, :update, :destroy]

  get '/allocation-plans/:id' => 'allocation_plans#show'
  delete '/allocation-plans/:id' => 'allocation_plans#destroy'
  resources :allocation_plans, path: '/allocation-plans/:year/:month', only: [:index, :create, :update]
  resources :allocation_plan_budget_items, path: '/allocation-plan-budget-items', only: [:create, :update]

  get '/monthly-statistics/:year/:month' => 'monthly_statistics#show'
  get '/monthly-statistics-budget/:year/:month' => 'monthly_statistics#budget'

  get  '/past-expenses/:name' => 'users#past_expenses'
  post '/update-account-info' => 'users#update_account_info'
  post '/change-password'     => 'users#change_password'
  get '/account-info'         => 'users#account_info'
  post '/update-avatar'       => 'users#update_avatar'

  get '/admin/users' => 'admin#users'

  if Rails.env.test?
    get "/*path", to: proc {|env| [200, {}, [File.read(Rails.public_path.join('index.html'))]] }
  end
end

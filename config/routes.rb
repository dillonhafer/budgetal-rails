Budgets::Application.routes.draw do
  root to: 'welcome#index'

  get '/privacy'                         => 'welcome#index'
  get '/budgets/:year/:month'            => 'welcome#index'
  get '/detailed-budgets/:year/:month'   => 'welcome#index'
  get '/annual-budgets/:year'            => 'welcome#index'
  get '/monthly-statistics/:year/:month' => 'welcome#index'
  get '/admin'                           => 'welcome#index'
  get '/account'                         => 'welcome#index'

  devise_for :users,
             path: 'sessions',
             path_names: {
               sign_in: 'sign-in',
               sign_out: 'sign-out',
               password: 'secret',
               confirmation: 'verification',
               unlock: 'unblock',
               registration: 'sign-up',
               sign_up: 'join'
             }

  namespace :api, defaults: {format: 'json'} do
    devise_for :users,
               path: 'sessions',
               path_names: { sign_in: 'sign-in', sign_out: 'sign-out', registration: 'sign-up' }

    resources :budgets, only: [:update]
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
    resources :allocation_plans, path: '/allocation-plans/:year/:month', only: [:index, :create, :update]
    resources :allocation_plan_budget_items, path: '/allocation-plan-budget-items', only: [:create, :update]

    get "/monthly-statistics/:year/:month" => "monthly_statistics#show"
    get "/monthly-statistics-budget/:year/:month" => "monthly_statistics#budget"

    get '/my-account' => 'users#my_account'
    get '/past-expenses/:name' => 'users#past_expenses'

    get '/admin/users' => 'admin#users'
    get '/sessions' => 'sessions#index'
  end
end

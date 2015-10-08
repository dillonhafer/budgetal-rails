Budgets::Application.routes.draw do
  root to: 'welcome#index'

  get '/chart' => 'monthly_statistics#chart', as: 'chart'
  get '/privacy' => 'welcome#privacy', as: 'privacy'

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
               path_names: { sign_in: 'sign-in', sign_out: 'sign-out' }
  end

  resources :users
  resources :budgets

  get '/budget-categories/:id/import' => 'budget_categories#import'
  get '/budget-categories/:year/:month/:id' => 'budget_categories#show'
  match '/cash-flow-plans/:year/:month' => 'budget_categories#index', as: 'my_budgets', via: [:get, :post]

  resources :budget_items, path: 'budget-items'
  resources :budget_item_expenses, path: 'budget-item-expenses'

  get '/annual-budgets/:year' => 'annual_budgets#index', as: 'annual_budgets'
  resources :annual_budgets, path: '/annual-budgets'
  resources :annual_budget_items, path: '/annual-budget-items'

  match '/allocation-plans/:id/edit' => 'allocation_plans#edit', as: 'edit_allocation_plan', via: [:get, :post]
  resources :allocation_plans, path: '/allocation-plans/:year/:month'
  resources :allocation_plan_budget_items, path: '/budgets/:budget_id/allocation-plans/:id/budget-items/:budget_item_id'

  patch '/move-budget-item' => 'budget_items#move_item', as: 'move_item'

  get '/past-expenses/:name' => 'users#past_expenses', as: 'past_expenses'
  get "/monthly-statistics" => "monthly_statistics#index", as: 'monthly_statistics'
  get "/monthly-statistics/:year(/:month)" => "monthly_statistics#show", as: 'monthly_statistic'

  get '/admin' => 'admin#index', as: 'admin'
  get '/my-account' => 'users#my_account', as: 'my_account'
  match '/allocation-plans/:year/:month' => 'allocation_plans#index', as: 'my_allocation_plans', via: [:get, :post]
  match '/allocation-plan-budget-items/create' => 'allocation_plan_budget_items#create', as: 'create_allocation_plan_budget_item', via: [:get, :post, :patch]
end

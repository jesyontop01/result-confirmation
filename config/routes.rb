Rails.application.routes.draw do
  
  resources :payment_search
  get 'payment_search/index'
  get 'payment_search/show'
  resources :test_results
  get 'confirm_amounts/index'
  get 'confirm_amounts/show'
  resources :payments
  resources :assignments
  resources :roles
  resources :receipt_statuses
  resources :receipt_booklets
  get 'confirm_countries/index'
  get 'confirm_countries/show'
  get 'confirm_types/index'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :packing_lists
  get 'api_users/new'
  get 'years/index'

  resources :waec_school_exams

  resources :waec_private_exams

  resources :confirmations do
    resources :confirm_types
  end
  resources :confirm_countries

  resources :years
  resources :confirm_types
  resources :confirm_amounts



  resources :diets
  resources :account_activations, only: [:update]

 devise_for :users, controllers: {
     registrations: 'users/registrations',
      sessions: 'users/sessions'
  }
  root 'dashboard#index'
  #root 'api_users#new'
  get 'confirmations/index' => 'exams/index'

  resource :api_users

  resources :searches
  resources :offices

  resources :users do
    collection do
      get :permitted_users
    end
  end
  resources :verifiers
    resources :exams do
         collection do
          get :confirmations
        end
    end
  get "*unmatched_route" => "exams#index"

  get 'account_activation/new'

  get 'account_activation/edit'


  get 'offices/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

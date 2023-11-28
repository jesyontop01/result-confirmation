Rails.application.routes.draw do
  
  resources :app_service_types
  resources :confirmation_images
  resources :confirm_backup_data
  resources :web_service_file_upload_responses
  get 'main_offices/index'
  resources :main_offices
  resources :waec_zonal_offices
  #resources :api_results
  # resources :waec_exams
  resources :waec_centres
  resources :waec_offices
  resources :finance_depts
  resources :departments
  resources :divisions
  resources :searches
  get 'leaflets/index'
  resources :leaflets
  resources :signatures do 
    collection  do
      get :users_signatures
    end
    
  end
  resources :web_services do
    collection do
      get :api_transaction_responses
      get :get_WebServices_By_ServiceType
    end
    get :get_WebServices_By_ServiceType
  end
  resources :transaction_types
  resources :receipt_corrections
  resources :peoples
  resources :payment_searches
  get 'payment_searches/index'
  get 'payment_searches/show'
  resources :test_results
  get 'confirm_amounts/index'
  get 'confirm_amounts/show'
  resources :payments do
    collection do
         get :receipt_payment_details
      end
  end
  #resources :assignments

   resources :assignments do
    collection do
        get :user_permissions#, :to => 'assignments#user_permissions'
      end
  end


  resources :roles
  resources :receipt_statuses

   resources :receipt_statuses do
        collection do
          get :receipt_correction
          #get :getReceiptLeafletCount
          #get '/receipt_statuses/getReceiptLeafletCount', :to => 'receipt_statuses#getReceiptLeafletCount'
          patch 'receipt_correction/:receiptNo', :to => 'receipt_statuses#receipt_correction'
        end
    end

  resources :receipt_booklets
  get 'confirm_countries/index'
  get 'confirm_countries/show'
  get 'confirm_types/index'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :packing_lists do
    collection do
      get :download_file
    end
  end
  get 'api_users/new'
  get 'years/index'

  resources :waec_school_exams

  resources :waec_private_exams

  resources :confirmations do
    collection do
      get :confirm_IsPrint
      get :search_confirmation
    end
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
      sessions: 'users/sessions',
      passwords: 'users/passwords'
  }
  root 'dashboard#index'
  #root 'api_users#new'
  #get 'confirmations/index' => 'exams/index'

  resource :api_users

  resources :searches
  resources :offices

  resources :users do
    collection do
      get :permitted_users
      get :permitted_users1
      get :second_signatory
      get :user_permissions#
      post :set_user_role  
      get :get_SecondUser
      get :email_validity
      get :username_validity
      patch 'set_user_role/:id', :to => 'users#set_user_role'
      patch 'upload_user_signature/:id', :to => 'users#upload_user_signature'
    end
  end
  resources :verifiers
    resources :exams do
         collection do
          get :confirmations
          get :getResultStatus
          get :getResultByCandidate
          get :getSearchedResultDetails
          get :connectToWesAPI
          get :retrieveWESApplicantInfo
          get :getSearchedResultDetailsForConfirmation
          post :transferFileToWesAPI
        end
    end

resources :waec_exams  do
  collection do
   get :SearchCandidateFromVerifier
   get :confirmations
 end
end

  resources :api_results do
         collection do
          get :getSearchedResultDetails
          get :confirmations
          get :getResultStatus
          get :getResultByCandidate
          get :getCertficateEnquiryAndResultDetails
        end
    end
  #get "*unmatched_route" => "exams#index"

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

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  	namespace :api do
        namespace :v1 do
          post 'user', to: 'user#create'
          get 'user/types', to: 'user#getAllTypes'
          get 'users', to: 'user#index'
          post 'user/login', to: 'user#login'
          post 'user/authenticate', to: 'user#authenticate'
          get 'documents', to: 'post#index'
          get 'document/:id', to: 'post#show'
          post 'document/delete/:id', to:'post#delete'
        	resources :post do
      			collection do
			        get :upload
			        post :upload
			    end
			end
        end
    end
  	root to: 'application#angular'
end

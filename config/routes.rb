Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  	namespace :api do
        namespace :v1 do
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

class ApiUsersController < ApplicationController
	 #skip_before_action :authenticate_user!
	# require 'httparty'

  def new
  end

  def show

  	if params[:email].present? && params[:password].present? 

	 #response = RestClient.get "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.collection&access_token=2ace9111870766f9c7c85139cb811d58&medium=#{search_term}&page=1&per_page=100"
	 response = RestClient.get "http://172.21.13.44:8080/activedirauth?email=#{params[:email]}&password=#{params[:password]}"
		@result = JSON.parse response 
 
	
         #binding.pry    
    if @result['authenticated'] == true #."#{authenticated}" == true @json_object['test']['this']
      user = User.find_by_email(params[:email])
          if user.present?
          sign_in user
          #if user_signed_in?
          user.update_attributes!(:logged_in=> 'true' )
          user.update(:is_signedIn => 1 )
          
        
          flash[:success] = "Welcome to WAEC Result Verifier App.!"
          redirect_to current_user

          else
            redirect_to new_user_registration_path
            #redirect_to new_user_registration_path(:user => {:email => params[:email], :password=> params[:password], :password_confirmation =>params[:password]})
          end
      #redirect_to new_user_session_path
      else
      	flash[:danger] = "Sorry !, You are not permitted at this Time. Kindly see the Administrator!"
      	redirect_to api_users_new_path
    end

    respond_to do |format|
		format.html {}
		format.json { render json: @result }
		end	
  end
end

  private

  def api_user_params
  	params.require(:api_user).permit(:email, :password)
  end
end

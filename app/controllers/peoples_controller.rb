class PeoplesController < ApplicationController
  def index
  end

  
  def update


  	@user = current_user
	#user = User.find(ID of the user whose password you want to change)
	@user.password = params[:password]
	@user.password_confirmation = params[:password_confirmation]
	@user.save

  		 # if @user.save
  		 # 	#sign_out @user
  		 # end
  	      render json: @user, status: :ok
        #else
          #render json: @applicant.errors, status: :unprocessable_entity	
  end


  private
  
  def people_params
  	params.require(:user).permit(:password, :password_confirmation, :current_password)
  end

end

class AccountActivationsController < ApplicationController
  before_action :authenticate_user!

	# PATCH/PUT /users/1
  # PATCH/PUT /users/1.json

  def update
  	
  	if params[:activated].present? 
      
  	 @user = User.find(params[:id])
        #binding.pry
        #@user.update(user_params)
        if params[:activated] == "true"
      	@user.update_attributes(:activated_at => Time.zone.now, :activated => 'true' )
      		UserMailer.welcome(@user).deliver
  		 	flash[:notice] = "User account Successfully activated."
      else
      	@user.update_attributes(:activated_at => Time.zone.now, :activated => 'false' )
      		flash[:notice] = "User account Successfully Deactivated."
      end
      #binding.pry
      	if @user.save
      	respond_to do |format|
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
        format.js {}
      # else
      #   format.html { render :edit }
      #   format.json { render json: @user.errors, status: :unprocessable_entity }
      end
     end
    end
  end

end

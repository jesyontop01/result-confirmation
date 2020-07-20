class UsersController < ApplicationController
  before_action :authenticate_user!
  #load_and_authorize_resource

  def index
  	if params[:activated] == "false"
      @users = User.where(activated: false)

    elsif params[:activated]== "true"
        @users = User.where(activated: true)

    else
      @users = User.all
    end
    render json: @users
  end

  def show
  	@user = User.find(params[:id])

    render json: @user
  end

  def edit
    @user = User.find(params[:id])

    render json: @user
  end

  def update
  	@user = User.find(params[:id])
  	  @user.update_attributes(activation_params) 
       if @user.activated =="true"
        binding.pry
      UserMailer.welcome(@user).deliver_now!
  		 flash[:notice] = "User account Successfully activated."
        redirect_to users_path
      elsif @user.activated =="false"
          flash[:notice] = "User account Successfully Deactivated."
        #redirect_to users_path
        render json: @users
    
    else
      #render :action => 'edit'
    end

    #render json: @users
  end

   def destroy
  	@user = User.find(params[:id])
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_path, notice: 'User was successfully Removed.' }
      format.json { head :no_content }
    end
  end

  def permitted_users
  #Performing AND operation
    #User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
    @signatoryArray = [] 

    if current_user.is_management?
        user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
        @signatoryArray[1] = user1
        aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => false))
        user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
        @signatoryArray[0] = user2

    else
      user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
      @signatoryArray[0] = user1
      aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
      user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
      @signatoryArray[1] = user2
    end
    #signatoryArray << current_user.pluck(:surname, :othernames) 
    
    #signatoryArray << aRStaff.pluck(:surname, :othernames) 
    # @users = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true))
    #  if @users.includes(:is_management => true)
    #     @users.each do |user|
    #            "#{user.surname +" "+ user.othernames}"
    #         end
    #  else
    #  puts false
    #  end

     render json: @signatoryArray   
  end


  private
  
  def activation_params
  	params.require(:user).permit(:activated, :admin, :encrypted_password, :is_management, :superadmin_role, :audit_role)
  end
end

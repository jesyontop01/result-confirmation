class UsersController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :except => [:user_permissions, :second_signatory, :permitted_users ]

  def index
  	if params[:activated] == "false"
      @users = User.where(activated: false)

    elsif params[:activated]== "true"
        @users = User.where(activated: true)

    else
      @users = User.all
      
             params[:user_id] = current_user.id

              sql = <<-SQL 
      
              SELECT 
                   b.name
            FROM [verifierApp].[dbo].[assignments] as a
            inner join roles as b
            on a.role_id = b.id
            where a.[user_id] =  '#{params[:user_id]}'

            SQL

                @assignments = ActiveRecord::Base.connection.exec_query(sql)
    end
   # render json: @users

    respond_to do |format|
      format.json { render json: {users: @users, success: true, permission: @assignments}}
      else
      format.html { redirect_to users_path, notice: 'User was successfully Removed.' }
      
    end
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

  def set_user_role
    # params[:admin] = nil
    # params[:audit_staff] = nil
    # params[:audit_admin] = nil
    # params[:exam_staff] = nil
    # params[:account_staff] = nil
    
     @user = User.find(params[:id])
       @user.role_ids = [ params[:admin] , params[:audit_staff] , params[:audit_admin], params[:exam_staff] , params[:account_staff]]  
    
    #binding.pry
    render json: {user:   @user}
  end

  def user_permissions
    @user_permission = current_user.permission
    render json: {permission:  @user_permission}
  end

  def second_signatory
    if params[:email] && params[:password]
    user = User.find_for_authentication(:email => params[:email])
    user&.valid_password?(params[:password]) ? user : nil

      if user.is_management == true
        user2 = User.where(id: user).pluck(:title, :surname, :othernames, :is_management)
         signatoryUser = [] 
         signatoryUser[1] = user2

        render json: signatoryUser
      elsif user.is_management == false
         user2 = User.where(id: user).pluck(:title, :surname, :othernames, :is_management)
         signatoryUser = [] 
         signatoryUser[0] = user2
         
        render json: signatoryUser

        else
        
        render json: {message: "User not authenticated"}
      end
    end
    
  end

  def permitted_users
   
  #Performing AND operation
    #User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
    @signatoryArray = [] 
    
      ## setting AR staff at array number 2 and National staff at array number 1
    if current_user.is_management?
        user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
        @signatoryArray[1] = user1
        # aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => false))
        #                # if aRStaff.timedout?(Time.now)
        #                #     aRStaff.update(:is_signedIn => 0 )
        #                #     aRStaff.update(:logged_in => true )
        #                #     sign_out(aRStaff)
        #                #   return false
        #                # else
        #                #   user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
        #                #   @signatoryArray[0] = user2

        #                #   return true
        #                # end
        # user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
        #@signatoryArray[0] = user2

    else
      ## setting AR staff at array number 2 and National staff at array number 1
            user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
            @signatoryArray[0] = user1

      # aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
      # user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
      # @signatoryArray[1] = user2
    end

     render json: @signatoryArray   
  end


  private
  
  def activation_params
  	params.require(:user).permit(:activated, :admin, :encrypted_password, :is_management, :superadmin_role, :audit_role, :permission)
  end
end

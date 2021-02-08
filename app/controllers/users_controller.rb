class UsersController < ApplicationController
  before_action :authenticate_user!, :except => [:email_validity]
  load_and_authorize_resource :except => [:user_permissions, :second_signatory, :permitted_users , :email_validity]

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
        #binding.pry
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

  def decode_base64
    decoded_data = Base64.decode64(params[:signature][:base64])
    data = StringIO.new(decoded_data)
    data
  end

    def upload_user_signature
    
     @user = User.find(params[:id]) 
      current_user.update(:signature => params[:signature])
    #binding.pry
    render json: {user:   @user}
  end



  def set_user_role
    # params[:admin] = nil
    # params[:audit_staff] = nil
    # params[:audit_admin] = nil
    # params[:exam_staff] = nil
    # params[:account_staff] = nil
    
     @user = User.find(params[:id])
       @user.role_ids = [ params[:admin],  params[:Management_Staff] , params[:audit_staff] , params[:audit_admin], params[:exam_staff] , params[:account_staff]]  
    
    #binding.pry
    render json: {user:   @user}
  end

  def user_permissions
    @user_permission = current_user.permission
    render json: {permission:  @user_permission}
  end

  def email_validity
    if params[:email]
      user = User.find_by(:email => params[:email])
      if user.present?
         render json: {message: "Sorry! Email has being taken", success: true }
      else
        render json: {message: "Email is available", success: false }
      end
    else
      render json: {message: " Email can not be blank", success: true }
    end

  end

  def second_signatory

    if params[:email] && params[:password]
    user = User.find_for_authentication(:email => params[:email])
    user&.valid_password?(params[:password]) ? user : nil

      # if user.is_management == true
      #   user2 = User.where(id: user).pluck(:title, :surname, :othernames, :is_management)
      #     # u = Signature.where(user_id: user.id).first.base64 
      #     # user2 << u 
      #    signatoryUser = [] 
      #    signatoryUser[1] = user2
         
      #    #render json: signatoryUser
      #   render json: {signatory2: signatoryUser, logUser: user , success: false }
      # elsif user.is_management == false
      #    user2 = User.where(id: user).pluck(:title, :surname, :othernames, :is_management)
      #     # u = Signature.where(user_id: user.id).first.base64 
      #     # user2 << u
      #    signatoryUser = [] 
      #    signatoryUser[0] = user2
         
      #   #render json: signatoryUser
      #   render json: {signatory2: signatoryUser, logUser: user , success: false }

      #   else
            if user.nil?

                  render json: {message: "User not authenticated"}  
              else

                if user.office_id != current_user.office_id
                  render json: {message: "Sorry! Signatories must be from same office", success: false }

                elsif user.role? :account_staff
                  render json: {message: "Sorry! Signatories must be from TAD", success: false }

                elsif user.role? :audit_staff
                  render json: {message: "Sorry! Signatories must be from TAD", success: false }

                elsif user.email == current_user.email
                  render json: {message: "Sorry! Signatories must be two(2) individuals", success: false }

                elsif user.is_management == current_user.is_management
                  render json: {message: "Sorry! Signatories must include two(2) individuals of National and Management Staff", success: false }
                
                elsif user.is_national_Staff == current_user.is_national_Staff
                  render json: {message: "Sorry! Signatories must include two(2) individuals of National and Management Staff", success: false }
               binding.pry 
                else
                  render json: {logUser: user , success: true }
                end
           

            end 
        #binding.pry
      end
    
  end

  def permitted_users2
   
  #Performing AND operation
    #User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
    @signatoryArray = [] 
    
      ## setting AR staff at array number 2 and National staff at array number 1
    if current_user.is_management?
        user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
         # u = Signature.where(user_id: current_user.id).first.base64 
         #  user1 << u  
        @signatoryArray[1] = user1
        aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => false))
                       # if aRStaff.timedout?(Time.now)
                       #     aRStaff.update(:is_signedIn => 0 )
                       #     aRStaff.update(:logged_in => true )
                       #     sign_out(aRStaff)
                       #   return false
                       # else
                       #   user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
                       #   @signatoryArray[0] = user2

                       #   return true
                       # end
        user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
        # u = Signature.where(user_id: aRStaff.id).first.base64 
        # user2 << u  
        @signatoryArray[0] = user2

    else
      ## setting AR staff at array number 2 and National staff at array number 1
            user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
            # u = Signature.where(user_id: current_user.id).first.base64 

            # if u.present?
            #   user1 << u 
            # end

            user1 
            
            @signatoryArray[0] = user1

      aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
      user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
      # u = Signature.where(user_id: aRStaff.id).first.base64 
      #   user2 << u
      @signatoryArray[1] = user2
    end

     render json: @signatoryArray   
  end

    def permitted_users
   
       if params[:email].present?

                @signatoryArray = [] 
                
                  ## setting AR staff at array number 2 and National staff at array number 1
                if current_user.is_management?
                    user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames, :id)
                     u = Signature.where(user_id: current_user.id).first.base64 
                      user1 << u  
                    @signatoryArray[1] = user1

                    #natStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => false))
                       ## Get Second Signatory as a National Staff
                       u = User.where(email: params[:email])

                    if u[0]["is_national_Staff"] == true

                      user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                        u2 = Signature.where(user_id: user2)
                        u = u2.first.base64 
                     #binding.pry   
                        user2 << u  
                        @signatoryArray[0] = user2

                        render json: {data: @signatoryArray , success: true } 
                        
                    else
                      render json: {message: "Sorry! this printing requires a National Staff signatory", success: false }
                    end
                 #    user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                 #    u2 = Signature.where(user_id: user2)
                 #    u = u2.first.base64 
                 # #binding.pry   
                 #    user2 << u  
                 #    @signatoryArray[0] = user2

                else
                  ## setting AR staff at array number 2 and National staff at array number 1
                        user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames, :id)
                        u = Signature.where(user_id: current_user.id).first.base64 
                        user1 << u 
                        @signatoryArray[0] = user1

                    u = User.where(email: params[:email])

                    if u[0]["is_management"] == true

                      user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                        u2 = Signature.where(user_id: user2)
                        u = u2.first.base64 
                     #binding.pry   
                        user2 << u  
                        @signatoryArray[1] = user2

                        render json: {data: @signatoryArray , success: true } 

                    else
                      render json: {message: "Sorry! this printing requires a Management Staff signatory", success: false }
                    end

                 #  #aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
                 #    user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                 #    u2 = Signature.where(user_id: user2)
                 #    u = u2.first.base64 
                 # #binding.pry    
                 #    user2 << u
                 #  @signatoryArray[1] = user2
                end

                 

             end 

       #       render json: @signatoryArray 
       # end


     # render json: @signatoryArray   
  end

      def permitted_users1
   
       if params[:email].present?

                @signatoryArray = [] 
                
                  ## setting AR staff at array number 2 and National staff at array number 1
                if current_user.is_management?
                    user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames, :id)
                     # u = Signature.where(user_id: current_user.id).first.base64 
                     #  user1 << u  
                    @signatoryArray[1] = user1

                    #natStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => false))
                 
                    u = User.where(email: params[:email])

                    if u[0]["is_national_Staff"] == true

                      user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                     #binding.pry   
                        @signatoryArray[0] = user2

                        render json: {data: @signatoryArray , success: true } 
                    else
                      render json: {message: "Sorry! this printing requires a National Staff signatory", success: false }
                      #binding.pry 
                    end

                 #    user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                 # #    u2 = Signature.where(user_id: user2)
                 # #    u = u2.first.base64 
                 # # #binding.pry   
                 # #    user2 << u  
                 #    @signatoryArray[0] = user2

            else
                  ## setting AR staff at array number 2 and National staff at array number 1

                   user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames, :id) 
                        @signatoryArray[0] = user1
                 
                     u = User.where(email: params[:email])

                    if u[0]["is_management"] == true

                      user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)   
                     
                        @signatoryArray[1] = user2

                        render json: {data: @signatoryArray , success: true } 
                    else
                      render json: {message: "Sorry! this printing requires a Management Staff signatory", success: false }
                    
                    end
                 #        user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames, :id)
                 #        # u = Signature.where(user_id: current_user.id).first.base64 
                 #        # user1 << u 
                 #        @signatoryArray[0] = user1

                 #  #aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
                 #    user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                 # #    u2 = Signature.where(user_id: user2)
                 # #    u = u2.first.base64 
                 # # #binding.pry    
                 # #    user2 << u
                 #  @signatoryArray[1] = user2
                end

                 

             end 

       #       render json: @signatoryArray 
       # end


     # render json: @signatoryArray   
  end


 def get_SecondUser
   if params[:email].present?
     user = User.find_by(:email => params[:email])     
   end
   render json: {success: true, secondUser: user}
 end




  private
  
  def activation_params
  	params.require(:user).permit(:activated, :admin, :encrypted_password, :is_management, :superadmin_role, :audit_role, :permission, :signature)
  end
end

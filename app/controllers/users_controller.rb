class UsersController < ApplicationController
  before_action :authenticate_user!, :except => [:email_validity, :username_validity]
  load_and_authorize_resource :except => [:user_permissions, :second_signatory, :permitted_users ,:permitted_users1 , :username_validity, :email_validity, :confirm_IsPrint]

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
            FROM [verifierApp].[dbo].[users] as a
            inner join roles as b
            on a.role_id = b.id
            where a.[id] =  '#{params[:user_id]}'

            SQL

                @assignments = ActiveRecord::Base.connection.exec_query(sql)
    end
   # render json: @users

    respond_to do |format|
      format.json { render json: {users: @users, success: true, permission: @assignments}}
      #else
      #rescue_from Exception, with: lambda { |exception| render_error 500, exception }
     
      #format.json { render json: {success: false, message: "Users can't be loded"}}
    #end
     end rescue render json: {success: false, message: "Users can't be loded"}
  end

  def show
  	@user = User.find(params[:id])
#binding.pry
    render json: @user
  end

  def edit
    @user = User.find(params[:id])

    render json: @user
  end

  def update
  	@user = User.find(params[:id])

    if params[:activated] == true
      
       @user.update_attributes(activation_params) 

       SendActivationEmailJob.set(wait: 20.seconds).perform_later(@user)

       if @user.save
        @user.update(:activated_at => DateTime.now)
   
      
       flash[:notice] = "User account Successfully activated."
    
      end
        
    else

       @user.update_attributes(activation_params) 

       if @user.save
        @user.update(:activated_at => DateTime.now)

          flash[:notice] = "User account Successfully Deactivated."
        #redirect_to users_path
        end


    end


  	 #  @user.update_attributes(activation_params) 

    #    UserMailer.welcome(@user).deliver_now!
    #    SendActivationEmailJob.set(wait: 20.seconds).perform_later(@user)

    #    if @user.activated =="true"
    #     @user.update(:activated_at => DateTime.now)
   
      
  		#  flash[:notice] = "User account Successfully activated."
    #     redirect_to users_path
    #   elsif @user.activated =="false"
    #     @user.update(:activated_at => DateTime.now)

    #       flash[:notice] = "User account Successfully Deactivated."
    #     #redirect_to users_path
    #     render json: @users
    
    #   else
    #   #render :action => 'edit'
    #   end

    render json: @users
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
     
       # @user = User.find(params[:id])
        
       # @roleId = Role.find_by(:name => params[:roleName])

       #@user.update(:is_management => params[:is_management], :role_id => @roleId.id )
       if ((params[:roleName] == "exam_staff") && (params[:is_management] == true))
         @roleId = Role.find_by(:name => "exam_management")

       elsif ((params[:roleName] == "exam_staff") && (params[:is_management] == false))
         @roleId = Role.find_by(:name => "exam_national")

        else
           @roleId = Role.find_by(:name => params[:roleName])
       end

      @user.update(:role_id => @roleId.id )
      #binding.pry
      @user.save
 

    

       ##@user.update( is_national_Staff: params[:is_national_Staff] , is_management: params[:is_management])

       # case capacity
       #  when 0
       #    "You ran out of gas."
       #  when 1..20
       #    "The tank is almost empty. Quickly, find a gas station!"
       #  when 21..70
       #    "You should be ok for now."
       #  when 71..100
       #    "The tank is almost full."
       #  else
       #    "Error: capacity has an invalid value (#{capacity})"
       #  end

      #binding.pry
       # if @user
       #   @user.role_ids = [ params[:admin],  params[:audit_staff] ,params[:management_Staff], params[:national_Staff], params[:exam_staff] , params[:account_staff]]  
    
       # end
       
    render json: {user:   @user}
  end



  def user_permissions
    @user_permission = current_user.role.name
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


  def username_validity
    if params[:username]
      user = User.find_by(:username => params[:username])
      #binding.pry
      if user.present?
         render json: {message: "Sorry! Username has being taken", success: true }
      else
        render json: {message: "Username is available", success: false }
      end
    else
      render json: {message: " Username can not be blank", success: true }
    end

  end


  REGEX_PATTERN = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/ 
  def is_email_valid? email
      email =~REGEX_PATTERN
  end


  def second_signatory

    if params[:login] && params[:password]

      if is_email_valid? params[:login]
        user = User.find_for_authentication(:email => params[:login])
      else
        user = User.find_for_authentication(:username => params[:login])
      end
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

                  render json: {message: "User not authenticated", success: false}  
              else

                if user.office_id != current_user.office_id
                  render json: {message: "Sorry! Signatories must be from same office", success: false }

                # elsif user.role? :account_staff
                elsif user.role.name == "account_staff"
                  render json: {message: "Sorry! Signatories must be from TAD", success: false }

                # elsif user.role? :audit_staff
                elsif user.role.name == "audit_staff"
                  render json: {message: "Sorry! Signatories must be from TAD", success: false }

                elsif user.email == current_user.email
                  render json: {message: "Sorry! Signatories must be two(2) individuals", success: false }

                elsif user.role.name == current_user.role.name
                  render json: {message: "Sorry! Signatories must include two(2) individuals of National and Management Staff", success: false }
                
                #elsif user.is_national_Staff == current_user.is_national_Staff
              # elsif !user.role.name == !current_user.role.name
              #     render json: {message: "Sorry! Signatories must include two(2) individuals of National and Management Staff", success: false }
              #  #binding.pry 
                else
                  render json: {logUser: user , success: true }
                end
           

            end 
        #binding.pry
      end
    
  end

  # def permitted_users2
   
  # #Performing AND operation
  #   #User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
  #   @signatoryArray = [] 
    
  #     ## setting AR staff at array number 2 and National staff at array number 1
  #   if current_user.is_management?
  #       user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
  #        # u = Signature.where(user_id: current_user.id).first.base64 
  #        #  user1 << u  
  #       @signatoryArray[1] = user1
  #       aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => false))
  #                      # if aRStaff.timedout?(Time.now)
  #                      #     aRStaff.update(:is_signedIn => 0 )
  #                      #     aRStaff.update(:logged_in => true )
  #                      #     sign_out(aRStaff)
  #                      #   return false
  #                      # else
  #                      #   user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
  #                      #   @signatoryArray[0] = user2

  #                      #   return true
  #                      # end
  #       user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
  #       # u = Signature.where(user_id: aRStaff.id).first.base64 
  #       # user2 << u  
  #       @signatoryArray[0] = user2

  #   else
  #     ## setting AR staff at array number 2 and National staff at array number 1
  #           user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames)
  #           # u = Signature.where(user_id: current_user.id).first.base64 

  #           # if u.present?
  #           #   user1 << u 
  #           # end

  #           user1 
            
  #           @signatoryArray[0] = user1

  #     aRStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
  #     user2 = User.where(id: aRStaff).pluck(:title, :surname, :othernames)
  #     # u = Signature.where(user_id: aRStaff.id).first.base64 
  #     #   user2 << u
  #     @signatoryArray[1] = user2
  #   end

  #    render json: @signatoryArray   
  # end
#((user.role.name === "exam_management") || (user.role.name === "exam_national"))
    def permitted_users
   
       if params[:email].present?

                @signatoryArray = [] 
                
                  ## setting AR staff at array number 2 and National staff at array number 1
                if current_user.role.name == "exam_management"
                ##if current_user.role? :management_Staff 
                    user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames, :id)
                     u = Signature.where(user_id: current_user.id).first.base64 
                      user1 << u  
                    @signatoryArray[1] = user1

                    #natStaff = User.where(:office_id => current_user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => false))
                       ## Get Second Signatory as a National Staff
                       u = User.where(email: params[:email])
                if u[0]["office_id"] != current_user.office_id
                       render json: {message: "Sorry! The Pre-SignedIn Second signatory is from a different office 
                                                                '\n'. Please Sign In a User from your Office ", success: false }
                   
                else

                    #if u[0]["is_national_Staff"] == true
                    ##if User.find(u[0]["id"]).role? :national_Staff
                    #if u[0]["is_management"] == false
                    if u[0].role.name == "exam_national"

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
              if u[0]["office_id"] != current_user.office_id
                       render json: {message: "Sorry! The Pre-SignedIn Second signatory is from a different office 
                                                                '\n'. Please Sign In a User from your Office ", success: false }
                   
              else

                    
                    #if User.find(u[0]["id"]).role? :management_Staff
                    #if u[0]["is_management"] == true
                    if u[0].role.name == "exam_management"

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
                #if current_user.is_management?
                #if current_user.role? :management_Staff
                if current_user.role.name == "exam_management"

                  user1 = User.where(id: current_user.id).pluck(:title, :surname, :othernames, :id)
                      
                    @signatoryArray[1] = user1
                    
                    u = User.where(["email = ? and office_id = ?", params[:email], current_user.office_id])

         
                    if u[0]["office_id"] != current_user.office_id
                       render json: {message: "Sorry! The Pre-SignedIn Second signatory is from a different office 
                                                                '\n'. Please Sign In a User from your Office ", success: false }
                   
                    else
                     #if u[0]["is_management"] == false
                    #if u[0]["is_national_Staff"] == true
                    #if User.find(u[0]["id"]).role? :national_Staff
                     if u[0].role.name == "exam_national"

                    


                              user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)
                             #binding.pry   
                                @signatoryArray[0] = user2

                                render json: {data: @signatoryArray , success: true } 
                            else
                              render json: {message: "Sorry! this printing requires a National Staff signatory", success: false }
                              #binding.pry 
                            end

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

                    if u[0]["office_id"] != current_user.office_id
                       render json: {message: "Sorry! The Pre-SignedIn Second signatory is from a different office 
                                                                '\n'. Please Sign In a User from your Office ", success: false }
                   
                    else

                    #if u[0]["is_management"] == true
                    #if User.find(u[0]["id"]).role? :management_Staff
                    if u[0].role.name == "exam_management"

                              user2 = User.where(email: params[:email]).pluck(:title, :surname, :othernames, :id)   
                             
                                @signatoryArray[1] = user2

                                render json: {data: @signatoryArray , success: true } 
                            else
                              render json: {message: "Sorry! this printing requires a Management Staff signatory", success: false }
                            
                            end
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
  	params.require(:user).permit(:activated, :admin, :encrypted_password, :is_management, :activated_at)
  end
end

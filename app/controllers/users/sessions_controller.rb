class Users::SessionsController < Devise::SessionsController
# before_action :configure_sign_in_params, only: [:create]
before_action :notify_pusher_logout, only: :destroy
##before_action :admin_login, only: :create

 respond_to :json

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    # super
    # @user.update_attributes!(:logged_in=> 'true' )

    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
      @user.update_attributes!(:logged_in=> 'true' )
      @user.update(:is_signedIn => 1 )
    yield resource if block_given?
    
    ##respond_with resource, location: after_sign_in_path_for(resource)
    respond_to do |format|
      #format.html { redirect_to users_path, notice: 'User was successfully Removed.' }
      #binding.pry
      format.json { render json: @user }
    end

  end

    def notify_pusher_logout
        user = User.find(current_user.id)
        #@user.update_attribute!(:logged_in=> 'false' )
        user.update(:logged_in=> false )
         user.update(:is_signedIn => 0 )
        sign_out :user
    end

  # DELETE /resource/sign_out
  # def destroy
  #   #binding.pry
  #   #@user.update(:logged_in=> 'false' )
  #   super
  #   #signed_in = signed_in?(resource_name)
  #   #@user.update_attribute!(:logged_in=> 'false' )
  #   #sign_out_and_redirect(resource_name)
  #   #set_flash_message :notice, :signed_out if signed_in
  #     #end
  # end

private

  def admin_login
    
    user = User.find_by(email: params[:user][:email])
    #@user = current_user
    #binding.pry
    #if @user && @user.is_management = "true"
    ##u = User.where(email: params[:email])
    
    if user && user.is_management == true
    #if user && (user.role? :management_Staff)

    #unless @user.is_management = "false" 
     #activeUser =  User.where(:office_id => user.office_id ).merge( User.where( :logged_in => true)).merge( User.find(user[0]["id"]).role? :management_Staff)
    activeUser =  User.where(:office_id => user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
    #
    #binding.pry
     #activeUser.update(:logged_in=> 'false' )
    #sign_out :activeUser
      if activeUser.present?
        activeUser.update(:logged_in => false )
        activeUser.update(:is_signedIn => 3 )
      end
    
       # unless @user && @user.is_management = "true"
       #    activeUser =  User.where(:office_id => @user.office_id ).merge( User.where( :logged_in => true)).merge( User.where(:is_management => true))
       #    binding.pry
       #     activeUser.update(:logged_in=> 'false' )
       #    sign_out :activeUser

  end 

       
  end

    

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end

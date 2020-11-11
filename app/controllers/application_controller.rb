class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  respond_to :json
  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token, if: :json_request?

  #before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :check_if_logged_out

  rescue_from CanCan::AccessDenied do |exception|
        flash[:error] = exception.message
        redirect_to current_user #root_url
    end
 
 def before_sign_in_path_for(resource)
  	@user = User.find_by(:id)
  	if @user.activated?
  		redirect_to user_session_path
  	else
  		flash[:alert] = "Your account is yet to be activated, contact your the Administrator"
  		#redirect_to new_user_session_path
      redirect_to root_url
  end
 end

  private


   def check_if_logged_out
    if current_user && current_user.is_signedIn == 3
      current_user.update(:is_signedIn => 0 )
      sign_out(current_user)
      redirect_to root_path
    else
      return current_user
      end
    end



  protected
           #:email, :surname, :othernames, :title, :office_id, :lp_no
   def configure_permitted_parameters
      added_attrs = [:office_id, :lp_no, :username, :surname, :othernames, :title, :email, :password, :password_confirmation, :current_password, :is_management, :superadmin_role, :audit_role]
      devise_parameter_sanitizer.permit :sign_in, keys: [:username, :email, :password, :is_management]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :account_update, keys: [:office_id, :lp_no, :username, :surname, :othernames, :title, :email, :password, :password_confirmation, :current_password, :is_management, :superadmin_role, :audit_role]
    end

  def after_sign_in_path_for(resource)
    current_user
  end


  # def configure_permitted_parameters
  #    #devise_parameter_sanitizer.for(:sign_up).push(:name, :surname,:username, :email)
  #    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email, :password) }
  #   #devise_parameter_sanitizer.permit(:sign_in, keys: [:username,:email, :password])
  #   devise_parameter_sanitizer.for(:sign_up) { |u| u.permit([:office_id, :lp_no, :username, :surname, :othernames, :title, :email, :password, :password_confirmation, :is_management]) }
  #   #devise_parameter_sanitizer.permit(:sign_up, keys: [:office_id, :lp_no, :username, :surname, :othernames, :title, :email, :password, :password_confirmation, :is_management])
  #   #devise_parameter_sanitizer.permit(:account_update, keys: [ :office_id, :lp_no, :username, :surname, :othernames, :title, :email, :password, :password_confirmation, :is_management])
    
  #   devise_parameter_sanitizer.for(:account_update) { |u| u.permit([ :office_id, :lp_no, :username, :surname, :othernames, :title, :email, :password, :password_confirmation, :current_password, :is_management]) }
        
  # end

    def json_request?
      request.format.json?
    end
end



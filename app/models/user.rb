class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  before_save { email.downcase! }

  devise :database_authenticatable, :registerable, :timeoutable,
         :recoverable, :rememberable, :trackable, :validatable


VALID_EMAIL_REGEX = /\A[^@]+@waec\.org.ng\z/
validates :email, presence: true, length: { maximum: 255 }, 
          format: { with: VALID_EMAIL_REGEX }, uniqueness: true, case_sensitive: false
validate :user_exists, on: :create    

          belongs_to :office
          has_many :confirmations, dependent: :destroy
          has_many :receipt_booklets

          has_many :assignments , dependent: :delete_all
          has_many :roles, through: :assignments

#before_save :activate_user_or_timedout


  def user_exists
    if self.class.exists?(:email => email)
      #render json: { error: "Email already taken" }
      errors.add( "Email already taken" )
    end
  end
      # Method to access roles in the controllers.
      # @user.role? :admin
      def role?(role)  
        roles.any? { |r| r.name.underscore.to_sym == role }  
      end 


         def active_for_authentication?
	        # Uncomment the below debug statement to view the properties of the returned self model values.
	        # logger.debug self.to_yaml	
	        super && activated?
	     
     	   end

  def inactive_message 
    if !activated? 
      :not_approved 
    else 
      super # Use whatever other message 
    end
end

# Devise overrides
  def deactivate 
    self.activated = false 
  end 
  def activate 
    self.activated = true 
  end 
  def set_as_admin
    self.admin = true
  end

  # end Devise overrides
 def activate_user_or_timedout
    if self.is_signedIn == 3
   
     if self.timedout?(Time.now.localtime)
         current_user.update(:is_signedIn => 0 )
         sign_out(current_user)
       return false
     else
       return true
     end
   
    else
     false
    end
   end
   

end

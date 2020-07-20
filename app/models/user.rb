class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :timeoutable,
         :recoverable, :rememberable, :trackable, :validatable

          belongs_to :office
          has_many :confirmations, dependent: :destroy
          has_many :receipt_booklets

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

   

end

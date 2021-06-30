class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  before_save { email.downcase! }
   before_save :formatValues 
  after_create :set_user_role_on_registration

  devise :database_authenticatable, :registerable, :timeoutable,
         :recoverable, :rememberable, :trackable, :validatable, authentication_keys: [:login]


#VALID_EMAIL_REGEX = /\A[^@]+@waec\.org.ng\z/
validates :email, presence: true, length: { maximum: 255 }, uniqueness: true, case_sensitive: false
          #format: { with: VALID_EMAIL_REGEX }, 
validates :username, presence: true, uniqueness: { case_sensitive: false }
validate :validate_username
# only allow letter, number, underscore and punctuation.
validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
validate :user_exists, on: :create    

          belongs_to :office
          has_many :confirmations, dependent: :destroy
          has_many :receipt_booklets

          # has_many :assignments , dependent: :delete_all
          # has_many :roles, through: :assignments
          belongs_to :role
          belongs_to :dept

          has_one :signature


          def formatValues
            self.surname = self.surname.upcase
            self.othernames = self.othernames.upcase
            self.title = self.title.upcase
          end

#before_save :activate_user_or_timedout

  attr_writer :login

  def login
    @login || self.username || self.email
  end


    def self.find_for_database_authentication(warden_conditions)
      conditions = warden_conditions.dup
      if login = conditions.delete(:login)
        where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      elsif conditions.has_key?(:username) || conditions.has_key?(:email)
        where(conditions.to_h).first
      end
    end

  # def self.find_for_database_authentication warden_condition
  #   conditions = warden_condition.dup
  #   login = conditions.delete(:login)
  #   where(conditions).where(
  #     ["lower(username) = :value OR lower(email) = :value",
  #     { value: login.strip.downcase}]).first
  # end



    def validate_username
      if self.class.exists?(:email => username)
        errors.add(:username, :invalid)
      end
    end



  def user_exists
    if self.class.exists?(:email => email)
      #render json: { error: "Email already taken" }
      errors.add("Email already taken" )
    end
  end
      # Method to access roles in the controllers.
      # @user.role? :admin
      def role?(role)  
        roles.any? { |r| r.name.underscore.to_sym == role }  
      end 

  # def isAdmin
  #   self.role.name == "admin"      
  # end


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

# # Devise overrides
#   def deactivate 
#     self.activated = false 
#   end 
#   def activate 
#     self.activated = true 
#   end 
#   def set_as_admin
#     self.admin = true
#   end

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



   private



  def set_user_role_on_registration
        # if self.dept_id == 3
        #  roleId = Role.find_by(:name => "exam_staff").id 
        #  self.update(:role_id => roleId) 
        # end

        userDept = Dept.find_by(:id => self.dept_id)
        
          
        if userDept.name == 'Examinations Dept' && self.is_management == true
         roleId = Role.find_by(:name => "exam_management").id 
         self.update(:role_id => roleId) 

       elsif userDept.name == 'Examinations Dept' && self.is_management == false

         roleId = Role.find_by(:name => "exam_national").id 
         self.update(:role_id => roleId) 


        elsif self.dept_id == 1

         roleId = Role.find_by(:name => "account_staff").id 
         self.update(:role_id => roleId)

        elsif userDept.name == 'Audit Dept'
         roleId = Role.find_by(:name => "audit_staff").id 
         self.update(:role_id => roleId)
            
        end



       #  ##  If User is not
       #  if self.dept_id == 3 && self.is_management == true
       #   roleId = Role.find_by(:name => "exam_management").id 
       #   self.update(:role_id => roleId) 

       # elsif self.dept_id == 3 && self.is_management == false

       #   roleId = Role.find_by(:name => "exam_national").id 
       #   self.update(:role_id => roleId) 


       #  elsif self.dept_id == 1

       #   roleId = Role.find_by(:name => "account_staff").id 
       #   self.update(:role_id => roleId)

       #  elsif self.dept_id == 2
          
       #   roleId = Role.find_by(:name => "audit_staff").id 
       #   self.update(:role_id => roleId)
            
       #  end
     
   end


   def set_role_on_registration

      userDept = Dept.find_by(:id => self.dept_id)

        if self.dept_id == 3
         self.role_ids = [7]  
        end

        if self.dept_id == 1

            self.role_ids = [8]
        elsif self.dept_id == 2
          
          self.role_ids = [4]
            
        end
     
   end


   

end

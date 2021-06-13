class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :surname, :othernames, 
  					:office_id, :activated, :email, :lp_no, 
  					:password, :password_confirmation, :remember_me, :role_id, :is_management, :title
  					

  		# has_many :roles
  		belongs_to :role
  		has_one :signature
end

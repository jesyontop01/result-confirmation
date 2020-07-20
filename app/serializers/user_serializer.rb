class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :surname, :othernames, 
  					:office_id, :is_management, :activated, :email, :lp_no, :is_management,
  					:password, :password_confirmation, :remember_me, :admin, :superadmin_role,
  					:audit_role, :user_role
end

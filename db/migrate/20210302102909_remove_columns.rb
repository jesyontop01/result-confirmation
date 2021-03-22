class RemoveColumns < ActiveRecord::Migration[5.2]
	def self.up
	  remove_column :users, :permission
	  remove_column :users, :superadmin_role
	  remove_column :users, :audit_role
      remove_column :users, :signature
	end

	def self.down
	  add_column :users, :permission
	  add_column :users, :superadmin_role
	  add_column :users, :audit_role
      add_column :users, :signature
	end
end


      # ,[email]
      # ,[encrypted_password]
      # ,[reset_password_token]
      # ,[reset_password_sent_at]
      # ,[remember_created_at]
      # ,[sign_in_count]
      # ,[current_sign_in_at]
      # ,[last_sign_in_at]
      # ,[current_sign_in_ip]
      # ,[last_sign_in_ip]
      # ,[created_at]
      # ,[updated_at]
      # ,[username]
      # ,[surname]
      # ,[othernames]
      # ,[title]
      # ,[office_id]
      # ,[is_management]
      # ,[lp_no]
      # ,[admin]
      # ,[activated]
      # ,[activated_at]
      # ,[logged_in]
      # ,[is_signedIn]
      # ,[superadmin_role]
      # ,[audit_role]
      # ,[user_role]
      # ,[permission]
      # ,[signature]
      # ,[division_id]
      # ,[finance_dept_id]
      # ,[is_national_Staff]

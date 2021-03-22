class RemoveAttributesFromUsers < ActiveRecord::Migration[5.2]
  def self.up
    remove_column :users, :is_national_Staff
    #remove_column :users, :admin
    #add_column :users, :admin, :boolean, default: false
    remove_column :users, :user_role
  end

  def self.down
    add_column :users, :is_national_Staff, :boolean, default: false
    add_column :users, :admin, :boolean, default: false
    remove_column :users, :admin
    add_column :users, :user_role, :boolean, default: true 
  end
end

      # ,[is_management]
      # ,[lp_no]
      # ,[admin]
      # ,[activated]
      # ,[activated_at]
      # ,[logged_in]
      # ,[is_signedIn]
      # ,[user_role]
      # ,[dept_id]
      # ,[is_national_Staff]

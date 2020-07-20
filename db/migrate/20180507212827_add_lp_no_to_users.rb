class AddLpNoToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :lp_no, :integer
  end
end

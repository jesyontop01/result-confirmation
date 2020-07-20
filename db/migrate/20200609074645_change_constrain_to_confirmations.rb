class ChangeConstrainToConfirmations < ActiveRecord::Migration[5.2]
    def up
	 add_column :confirmations, :receipt_no, :string
	 change_column_null :confirmations, :receipt_no, false
	 add_index :confirmations, :receipt_no, :unique => true
	end

	 def down
	    remove_column :confirmations, :receipt_no, :string
	     
	 end
end

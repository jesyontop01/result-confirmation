class ChangePrintedInPayments < ActiveRecord::Migration[5.2]
    def up
    	remove_column :payments, :printed, :boolean
	 	add_column :payments, :printed, :boolean, default: false
	end

	def down   
	    remove_column :payments, :printed, :boolean, default: false 
	end
end

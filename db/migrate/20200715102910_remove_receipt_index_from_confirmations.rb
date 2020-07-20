class RemoveReceiptIndexFromConfirmations < ActiveRecord::Migration[5.2]
  def change
  	remove_index :confirmations, :receipt_no
  end
end

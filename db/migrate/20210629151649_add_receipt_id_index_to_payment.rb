class AddReceiptIdIndexToPayment < ActiveRecord::Migration[5.2]
  def up
    add_index :payments, :receipt_no, unique: true 
  end

  def down
    remove_index :payments, :receipt_no
  end
end

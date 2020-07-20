class AddReceiptToConfirmations < ActiveRecord::Migration[5.2]
  def change
    add_column :confirmations, :receipt_no, :string #, :null => false
  end
end

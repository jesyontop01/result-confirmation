class AddIndexToReceiptStatusesReceiptNo < ActiveRecord::Migration[5.2]
  def change
  	add_index :receipt_statuses, :receiptNo, unique: true 
  end
end

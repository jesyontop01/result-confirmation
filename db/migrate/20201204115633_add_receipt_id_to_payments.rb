class AddReceiptIdToPayments < ActiveRecord::Migration[5.2]
  def change
    add_reference :payments, :receipt_status, foreign_key: true
  end
end

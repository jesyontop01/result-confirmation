class AddConfirmationToReceiptStatuses < ActiveRecord::Migration[5.2]
  def change
    add_reference :receipt_statuses, :confirmation, foreign_key: true
  end
end

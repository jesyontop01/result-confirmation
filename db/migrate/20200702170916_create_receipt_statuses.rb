class CreateReceiptStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :receipt_statuses do |t|
      t.references :receipt_booklet, foreign_key: true
      t.integer :receiptNo
      t.string :status, default: 'UNUSED'

      t.timestamps
    end
  end
end

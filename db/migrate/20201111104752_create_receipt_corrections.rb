class CreateReceiptCorrections < ActiveRecord::Migration[5.2]
  def change
    create_table :receipt_corrections do |t|
      t.references :receipt_status, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

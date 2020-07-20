class CreateReceiptBooklets < ActiveRecord::Migration[5.2]
  def change
    create_table :receipt_booklets do |t|
      t.integer :rangeFrom
      t.integer :rangeTo
      t.references :office, foreign_key: true
      t.references :user, foreign_key: true
      t.string :status, default: 'OPEN'

      t.timestamps
    end
  end
end

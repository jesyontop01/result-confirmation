class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.references :diet, foreign_key: true
      t.references :year, foreign_key: true
      t.string :exam_no
      t.references :confirm_type, foreign_key: true
      t.decimal :amount
      t.string :receipt_no
      t.boolean :printed

      t.timestamps
    end
  end
end

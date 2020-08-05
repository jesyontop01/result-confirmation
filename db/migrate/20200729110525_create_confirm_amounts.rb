class CreateConfirmAmounts < ActiveRecord::Migration[5.2]
  def change
    create_table :confirm_amounts do |t|
      t.references :confirm_type, foreign_key: true
      t.decimal :amount

      t.timestamps
    end
  end
end

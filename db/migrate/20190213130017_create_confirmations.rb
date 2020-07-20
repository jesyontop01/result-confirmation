class CreateConfirmations < ActiveRecord::Migration
  def change
    create_table :confirmations do |t|
      t.references :user, index: true
      t.references :dietTbl, index: true
      t.references :yearTbl, index: true
      t.string :ref_no
      t.string :exam_no
      t.string :Cand_address
      t.string :dest_title
      t.string :dest_address1
      t.string :dest_address2
      t.string :dest_location
      t.string :dest_email

      t.timestamps
    end
  end
end

class CreateWaecCentres < ActiveRecord::Migration[5.2]
  def change
    create_table :waec_centres do |t|
      t.string :centre_no
      t.string :centre_type
      t.string :centre_name

      t.timestamps
    end
  end
end

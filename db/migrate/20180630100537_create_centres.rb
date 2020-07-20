class CreateCentres < ActiveRecord::Migration
  def change
    create_table :centres do |t|
      t.string :centre_no
      t.string :centre_type
      t.string :centre_name

      t.timestamps
    end
  end
end

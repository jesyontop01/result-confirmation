class CreateWaecZonalOffices < ActiveRecord::Migration[5.2]
  def change
    create_table :waec_zonal_offices do |t|
      t.string :ZoneName
      t.references :offices, foreign_key: true

      t.timestamps
    end
  end
end

class AddWaecZoneToOffices < ActiveRecord::Migration[5.2]
  def change
    add_reference :offices, :waec_zonal_offices, foreign_key: true
  end
end

class ChangeWaecZonalOfficesIdToWaecZonalOfficeId < ActiveRecord::Migration[5.2]
  def change
      rename_column :offices, :waec_zonal_offices_id, :waec_zonal_office_id
  end
end

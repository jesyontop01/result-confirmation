class ChangeOfficesIdNameToOfficeId < ActiveRecord::Migration[5.2]
  def change
     rename_column :waec_zonal_offices, :offices_id, :office_id
  end
end

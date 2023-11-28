class CreateAppServiceTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :app_service_types do |t|
      t.string :ServiceType

      t.timestamps
    end
  end
end

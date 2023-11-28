class AddAppServiceTypeToWebServices < ActiveRecord::Migration[5.2]
  def change
    add_reference :web_services, :app_service_types, foreign_key: true
  end
end

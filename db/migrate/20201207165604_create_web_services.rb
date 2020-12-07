class CreateWebServices < ActiveRecord::Migration[5.2]
  def change
    create_table :web_services do |t|
      t.string :clientName
      t.string :clientURL

      t.timestamps
    end
  end
end

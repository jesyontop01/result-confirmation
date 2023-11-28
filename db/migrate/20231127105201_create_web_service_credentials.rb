class CreateWebServiceCredentials < ActiveRecord::Migration[5.2]
  def change
    create_table :web_service_credentials do |t|
      t.references :web_services, foreign_key: true
      t.string :clientURL
      t.string :authURL
      t.string :submitURL
      t.string :username
      t.string :password
      t.timestamps
    end
  end
end

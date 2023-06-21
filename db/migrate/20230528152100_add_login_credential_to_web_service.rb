class AddLoginCredentialToWebService < ActiveRecord::Migration[5.2]
  def change
    add_column :web_services, :username, :string
    add_column :web_services, :password, :string
  end
end

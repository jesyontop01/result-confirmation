class AddDetailsToWebServices < ActiveRecord::Migration[5.2]
  def change
    add_column :web_services, :authURL, :string
    add_column :web_services, :submitURL, :string
  end
end

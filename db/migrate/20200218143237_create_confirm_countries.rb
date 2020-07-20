class CreateConfirmCountries < ActiveRecord::Migration[5.2]
  def change
    create_table :confirm_countries do |t|
      t.references :confirm_type, foreign_key: true
      t.string :countryName

      t.timestamps
    end
  end
end

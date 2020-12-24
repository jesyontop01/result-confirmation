class CreateSignatures < ActiveRecord::Migration[5.2]
  def change
    create_table :signatures do |t|
      t.string :filetype
      t.string :filename
      t.integer :filesize
      t.text :base64
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

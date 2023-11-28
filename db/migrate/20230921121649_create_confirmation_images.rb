class CreateConfirmationImages < ActiveRecord::Migration[5.2]
  def change
    create_table :confirmation_images do |t|
      t.string :fileType
      t.string :fileName
      t.string :fileSize
      t.text :base64Image
      t.integer :dietId
      t.string :candNo
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

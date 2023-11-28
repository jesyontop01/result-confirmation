class RenameColumns < ActiveRecord::Migration[5.2]
  def change
    change_table :confirmation_images do |t|
      t.rename :fileType, :filetype
      t.rename :fileName, :filename
      t.rename :fileSize, :filesize
      t.rename :base64Image, :base64
    end
  end
end

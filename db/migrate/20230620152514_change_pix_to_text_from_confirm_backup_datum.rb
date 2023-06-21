class ChangePixToTextFromConfirmBackupDatum < ActiveRecord::Migration[5.2]
  def change
    change_column :confirm_backup_data, :pix, :text
  end
end

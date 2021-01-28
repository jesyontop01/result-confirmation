class AddIsPrintedToConfirmations < ActiveRecord::Migration[5.2]
  def change
    add_column :confirmations, :isPrinted, :boolean, default: false
  end
end

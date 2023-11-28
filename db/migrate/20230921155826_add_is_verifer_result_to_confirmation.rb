class AddIsVeriferResultToConfirmation < ActiveRecord::Migration[5.2]
  def change
    add_column :confirmations, :IsVeriferResult, :boolean, default: false
  end
end

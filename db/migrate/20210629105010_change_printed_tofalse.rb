class ChangePrintedTofalse < ActiveRecord::Migration[5.2]
  def up
    change_column :payments, :printed, :boolean, default: false
  end

  def down
    change_column :payments, :printed, :boolean, default: nil
  end
end

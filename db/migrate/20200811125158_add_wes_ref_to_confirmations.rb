class AddWesRefToConfirmations < ActiveRecord::Migration[5.2]
  def change
    add_column :confirmations, :WES_Ref, :string
  end
end

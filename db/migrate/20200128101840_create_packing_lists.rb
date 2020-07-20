class CreatePackingLists < ActiveRecord::Migration[5.2]
  def change
    create_table :packing_lists do |t|
      t.string :office
      t.string :attachment

      t.timestamps
    end
  end
end

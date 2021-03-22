class AddStateToPackingLists < ActiveRecord::Migration[5.2]
  def self.up
    add_reference :packing_lists, :waec_office, foreign_key: true
    remove_column :packing_lists, :office
  end

   def self.down
    add_reference :packing_lists, :waec_office, foreign_key: true
    remove_column :packing_lists, :office
  end
end

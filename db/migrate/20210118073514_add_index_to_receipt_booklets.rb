class AddIndexToReceiptBooklets < ActiveRecord::Migration[5.2]
  def change
  	add_index :receipt_booklets, :rangeFrom, unique: true 
  	add_index :receipt_booklets, :rangeTo, unique: true 
  end
end

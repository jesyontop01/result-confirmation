class RenameColumnNamesIn < ActiveRecord::Migration
  def change
  	rename_column :offices, :name, :office_name
  	rename_column :offices, :state, :office_state
  end
end

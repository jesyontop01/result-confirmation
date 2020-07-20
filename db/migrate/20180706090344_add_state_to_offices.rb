class AddStateToOffices < ActiveRecord::Migration
  def change
    add_column :offices, :state, :string
  end
end

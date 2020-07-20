class AddOfficeIdToConfirmations < ActiveRecord::Migration[5.2]
  def change
    add_column :confirmations, :office_id, :integer
  end
end

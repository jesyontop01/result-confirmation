class AddConfirmTypeToConfirmation < ActiveRecord::Migration[5.2]
  def change
    add_reference :confirmations, :confirm_type, foreign_key: true
    add_reference :confirmations, :confirm_countries, foreign_key: true
  end
end

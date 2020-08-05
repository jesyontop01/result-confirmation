class AddUserOfficeToPayment < ActiveRecord::Migration[5.2]
  def change
    add_reference :payments, :user, foreign_key: true
    add_reference :payments, :office, foreign_key: true
  end
end

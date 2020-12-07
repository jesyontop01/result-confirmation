class AddPaymentIdToConfirmations < ActiveRecord::Migration[5.2]
  def change
    add_reference :confirmations, :payment, foreign_key: true
  end
end

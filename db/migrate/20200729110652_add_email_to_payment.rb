class AddEmailToPayment < ActiveRecord::Migration[5.2]
  def change
    add_column :payments, :cand_email, :string
  end
end

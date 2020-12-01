class AddTransactionDetailsToPayments < ActiveRecord::Migration[5.2]
  def change
    add_column :payments, :CandName, :string
    add_column :payments, :PhoneNo, :string
    add_reference :payments, :transaction_type, foreign_key: true
  end
end

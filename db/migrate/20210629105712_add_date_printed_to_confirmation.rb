class AddDatePrintedToConfirmation < ActiveRecord::Migration[5.2]
  def change
    add_column :confirmations, :DatePrinted, :datetime
  end
end

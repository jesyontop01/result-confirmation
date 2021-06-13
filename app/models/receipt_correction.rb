class ReceiptCorrection < ActiveRecord::Base
  belongs_to :receipt_status
  belongs_to :user
end

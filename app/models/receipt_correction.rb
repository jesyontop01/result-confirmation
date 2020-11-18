class ReceiptCorrection < ApplicationRecord
  belongs_to :receipt_status
  belongs_to :user
end

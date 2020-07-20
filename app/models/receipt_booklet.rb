class ReceiptBooklet < ActiveRecord::Base
  belongs_to :office
  belongs_to :user
  has_many :receipt_statuses, dependent: :destroy
end

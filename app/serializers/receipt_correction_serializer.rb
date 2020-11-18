class ReceiptCorrectionSerializer < ActiveModel::Serializer
  attributes :id
  has_one :receipt_status
  has_one :user
end

class ReceiptStatusSerializer < ActiveModel::Serializer
  attributes :id, :receiptNo, :status
  has_one :ReceiptBooklet
end

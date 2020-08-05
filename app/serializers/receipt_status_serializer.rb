class ReceiptStatusSerializer < ActiveModel::Serializer
  attributes :id, :receipt_booklet_id , :receiptNo, :status, :office_id
  has_one :receipt_booklet
end


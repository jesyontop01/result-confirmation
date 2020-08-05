class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :exam_no, :amount, :receipt_no, :printed, :cand_email
  has_one :diet
  has_one :year
  has_one :confirm_type
end

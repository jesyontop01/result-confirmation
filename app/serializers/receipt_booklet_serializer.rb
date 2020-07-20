class ReceiptBookletSerializer < ActiveModel::Serializer
  attributes :id, :rangeFrom, :rangeTo, :status
  has_one :office
  has_one :user
end

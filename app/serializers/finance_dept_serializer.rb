class FinanceDeptSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :division
end

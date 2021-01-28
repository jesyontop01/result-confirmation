class DivisionSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :finance_depts
end

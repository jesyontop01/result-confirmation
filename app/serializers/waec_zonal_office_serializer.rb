class WaecZonalOfficeSerializer < ActiveModel::Serializer
  attributes :id, :ZoneName
  has_one :offices
end

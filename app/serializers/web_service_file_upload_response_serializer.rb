class WebServiceFileUploadResponseSerializer < ActiveModel::Serializer
  attributes :id, :clientUploadId, :referenceNumber, :status, :uploadId
  has_one :confirmation
end

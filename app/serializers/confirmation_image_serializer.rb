class ConfirmationImageSerializer < ActiveModel::Serializer
  attributes :id, :filetype, :filename, :filesize, :base64, :dietId, :candNo
  has_one :user
end

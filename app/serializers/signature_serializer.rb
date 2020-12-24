class SignatureSerializer < ActiveModel::Serializer
  attributes :id, :filetype, :filename, :filesize, :base64
  has_one :user
end

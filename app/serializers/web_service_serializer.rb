class WebServiceSerializer < ActiveModel::Serializer
  attributes :id, :clientName, :clientURL#,:username, :password
end

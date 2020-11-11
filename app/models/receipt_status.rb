class ReceiptStatus < ActiveRecord::Base
  belongs_to :ReceiptBooklet
  #has_many :confirmations, dependent: :destroy
end

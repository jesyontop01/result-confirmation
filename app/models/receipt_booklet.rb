class ReceiptBooklet < ActiveRecord::Base
  belongs_to :office
  belongs_to :user
  has_many :receipt_statuses, dependent: :destroy

  validates :rangeFrom, presence: true, numericality: true, uniqueness: true
  validates :rangeTo, presence: true, numericality: { only_integer: true }, uniqueness: true
end

class ConfirmationImage < ActiveRecord::Base
  belongs_to :user
  validates :filename, presence: true
  validates :base64, :dietId, :candNo, presence: true
end

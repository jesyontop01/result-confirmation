class Confirmation < ActiveRecord::Base
  belongs_to :user
  belongs_to :diet
  belongs_to :year
  belongs_to :office
  belongs_to :confirm_type
  belongs_to :confirm_country
  belongs_to :receipt_status, optional: true

  validates_presence_of  :exam_no, :Cand_address
  validates_presence_of  :dest_title, :dest_address1, :dest_location
  validates_length_of :dest_title, :maximum => 40,
                :message => " field cannot exceed 40 Characters please"


  has_one :waec_private_exam, dependent: :destroy
  has_one :waec_school_exam, dependent: :destroy
end

class ConfirmationSerializer < ActiveModel::Serializer
    attributes :id ,:user_id,:diet_id,:year_id, :examYear, :ref_no,:exam_no,:Cand_address,:dest_title,
						:dest_address1,:dest_address2,:dest_location,:dest_email, :confirm_type_id, :confirm_country_id,
						:updated_at, :receipt_no, :DietName, :YearName, :office_name, :typeName, :countryName, :WES_Ref, :isPrinted, 
            :IsVeriferResult

  belongs_to :user
  belongs_to :diet
  belongs_to :year
  belongs_to :office
  belongs_to :confirm_type
  belongs_to :confirm_country
  belongs_to :receipt_status, optional: true
end

class ConfirmationSerializer < ActiveModel::Serializer
  attributes :id ,:user_id,:diet_id,:year_id,:ref_no,:exam_no,:Cand_address,:dest_title,
						:dest_address1,:dest_address2,:dest_location,:dest_email, :confirm_type_id, :confirm_country_id,
						:updated_at, :receipt_no
end

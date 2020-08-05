json.extract! payment, :id, :diet_id, :year_id, :exam_no, :confirm_type_id, :amount, :receipt_no, :printed, :created_at, :updated_at
json.url payment_url(payment, format: :json)

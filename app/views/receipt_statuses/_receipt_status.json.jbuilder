json.extract! receipt_status, :id, :receipt_booklet_id, :receiptNo, :status, :created_at, :updated_at
json.url receipt_status_url(receipt_status, format: :json)

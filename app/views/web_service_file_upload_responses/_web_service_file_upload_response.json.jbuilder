json.extract! web_service_file_upload_response, :id, :confirmation_id, :clientUploadId, :referenceNumber, :status, :uploadId, :created_at, :updated_at
json.url web_service_file_upload_response_url(web_service_file_upload_response, format: :json)

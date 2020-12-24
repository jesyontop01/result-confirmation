json.extract! signature, :id, :filetype, :filename, :filesize, :base64, :user_id, :created_at, :updated_at
json.url signature_url(signature, format: :json)

json.extract! confirmation_image, :id, :fileType, :fileName, :fileSize, :base64Image, :dietId, :candNo, :user_id, :created_at, :updated_at
json.url confirmation_image_url(confirmation_image, format: :json)

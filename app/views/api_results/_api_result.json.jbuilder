json.extract! api_result, :id, :created_at, :updated_at
json.url api_result_url(api_result, format: :json)

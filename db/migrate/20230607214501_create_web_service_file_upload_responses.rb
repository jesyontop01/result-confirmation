class CreateWebServiceFileUploadResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :web_service_file_upload_responses do |t|
      t.references :confirmation, foreign_key: true
      t.string :clientUploadId
      t.integer :referenceNumber
      t.string :status
      t.integer :uploadId

      t.timestamps
    end
  end
end

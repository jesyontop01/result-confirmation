class CreateApiResults < ActiveRecord::Migration[5.2]
  def change
    create_table :api_results do |t|

      t.timestamps
    end
  end
end

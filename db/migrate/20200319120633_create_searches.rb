class CreateSearches < ActiveRecord::Migration[5.2]
  def change
    create_table :searches do |t|
      t.string :keywords
      t.references :office, foreign_key: true
      t.references :confirm_type, foreign_key: true
      t.integer :year
      t.integer :month

      t.timestamps
    end
  end
end

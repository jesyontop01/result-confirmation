class CreateDietTbls < ActiveRecord::Migration
  def change
    create_table :diet_tbls do |t|
      t.string :diet

      t.timestamps
    end
  end
end

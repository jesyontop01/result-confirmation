class CreateYearTbls < ActiveRecord::Migration
  def change
    create_table :year_tbls do |t|
      t.string :year

      t.timestamps
    end
  end
end

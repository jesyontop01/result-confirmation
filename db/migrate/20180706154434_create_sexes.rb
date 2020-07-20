class CreateSexes < ActiveRecord::Migration
  def change
    create_table :sexes do |t|
      t.string :sex_code
      t.string :sex_name

      t.timestamps
    end
  end
end

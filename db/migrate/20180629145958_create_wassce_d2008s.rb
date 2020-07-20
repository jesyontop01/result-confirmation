class CreateWassceD2008s < ActiveRecord::Migration
  def change
    create_table :wassce_d2008s do |t|
      t.string :record_type
      t.string :exam_no
      t.string :sex
      t.string :disability
      t.string :date_of_birth
      t.string :full_name
      t.string :results
      t.string :form_no
      t.string :security_digit
      t.string :release_batch
      t.string :award

      t.timestamps
    end
    add_index :wassce_d2008s, :exam_no, unique: true
  end
end

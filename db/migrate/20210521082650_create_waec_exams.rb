class CreateWaecExams < ActiveRecord::Migration[5.2]
  def change
    create_table :waec_exams do |t|
      t.string :exam_name
      t.string :exam_diet
      t.string :table_name
      t.string :centre_table_name
      t.string :pix_folder

      t.timestamps
    end
  end
end

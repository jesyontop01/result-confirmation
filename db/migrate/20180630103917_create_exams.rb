class CreateExams < ActiveRecord::Migration
  def change
    create_table :exams do |t|
      t.string :exam_name
      t.string :exam_diet
      t.string :table_name

      t.timestamps
    end
  end
end

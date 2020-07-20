class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.string :SubjectCode
      t.string :ExamYear
      t.string :ShortName
      t.string :LongName
      t.string :ResultName

      t.timestamps
    end
  end
end

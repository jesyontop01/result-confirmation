class AddSubjectYearToExams < ActiveRecord::Migration
  def change
    add_column :exams, :subjectYear, :string
  end
end

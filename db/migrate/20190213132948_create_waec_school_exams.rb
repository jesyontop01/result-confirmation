class CreateWaecSchoolExams < ActiveRecord::Migration
  def change
    create_table :waec_school_exams do |t|
      t.references :confirmation, index: true

      t.timestamps
    end
  end
end

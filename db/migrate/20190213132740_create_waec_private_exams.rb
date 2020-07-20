class CreateWaecPrivateExams < ActiveRecord::Migration
  def change
    create_table :waec_private_exams do |t|
      t.references :confirmation, index: true

      t.timestamps
    end
  end
end

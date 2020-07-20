class AddModelNameToExams < ActiveRecord::Migration
  def change
    add_column :exams, :model_name, :string
  end
end

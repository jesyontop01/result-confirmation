class AddViewTableToExams < ActiveRecord::Migration
  def change
    add_column :exams, :view_name, :string
  end
end

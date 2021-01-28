class AddDepartmentToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :division, foreign_key: true
    add_reference :users, :finance_dept, foreign_key: true
  end
end

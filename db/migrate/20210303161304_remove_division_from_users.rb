class RemoveDivisionFromUsers < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :finance_dept_id, :dept_id
    remove_column :users, :division_id
  end
end
class CreateFinanceDepts < ActiveRecord::Migration[5.2]
  def change
    create_table :finance_depts do |t|
      t.string :name
      t.references :division, foreign_key: true

      t.timestamps
    end
  end
end

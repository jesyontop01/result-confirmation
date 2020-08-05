class CreateTestResults < ActiveRecord::Migration[5.2]
  def change
    create_table :test_results do |t|
      t.text   :Picture
      t.string :ExamDiet
      t.string :ExamYear
      t.string :CandNo
      t.string :CandName
      t.string :Sex
      t.string :DOB
      t.string :CentreName
      t.string :Subject1
      t.string :Grade1
      t.string :Subject2
      t.string :Grade2
      t.string :Subject3
      t.string :Grade3
      t.string :Subject4
      t.string :Grade4
      t.string :Subject5
      t.string :Grade5
      t.string :Subject6
      t.string :Grade6
      t.string :Subject7
      t.string :Grade7
      t.string :Subject8
      t.string :Grade8
      t.string :Subject9
      t.string :Grade9
      t.integer :NoOfSubjects
      t.integer :yearId
      t.integer :dietId

      t.timestamps
    end
  end
end

class CreateConfirmBackupData < ActiveRecord::Migration[5.2]
  def change
    create_table :confirm_backup_data do |t|
      t.references :confirmation, foreign_key: true
      t.string :CandNo
      t.string :Results
      t.string :FormNo
      t.string :Surname
      t.string :FirstName
      t.string :OtherNames
      t.string :DOB
      t.string :Sex
      t.string :Pix
      t.string :CentreName
      t.string :CertificateNo
      t.string :SecurityDigit
      t.string :Award
      t.string :CertificateStatus
      t.string :DatePrinted
      t.string :ExamTitle

      t.timestamps
    end
  end
end

class ConfirmBackupDatumSerializer < ActiveModel::Serializer
  attributes :id, :CandNo, :Results, :FormNo, :Surname, :FirstName, :OtherNames, :DOB, :Sex, :Pix, :CentreName, :CertificateNo, :SecurityDigit, :Award, :CertificateStatus, :DatePrinted, :ExamTitle
  has_one :confirmation
end

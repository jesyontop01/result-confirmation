# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

5000.times do |index|
  ConfirmCountry.create!(confirm_type_id: 2,
                        countryName: Faker::Address.country)
end
#ConfirmCountry id: nil, confirm_type_id: nil, countryName: nil,
#Faker::Address.country


# require 'csv'


# csv_text = File.read(Rails.root.join('lib', 'seeds', 'wassce_d2008.csv'))
# csv = CSV.parse(csv_text.scrub, headers: true)
# #csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   t = WassceD2008.new
#   t.record_type = row['record_type']
#   t.exam_no = row['exam_no']
#   t.sex = row['sex']
#   t.disability = row['disability']
#   t.date_of_birth = row['date_of_birth']
#   t.full_name = row['full_name']
#   t.results = row['results']
#   t.form_no = row['form_no']
#   t.security_digit = row['security_digit']
#   t.release_batch = row['release_batch']
#   t.award = row['award']
#   ##t.created_at = row[time.now]
#   ##t.updated_at = row[time.now]
#   t.save
#   #puts "#{t.record_type}, #{t.exam_no} saved"
# end
# puts "There are now #{WassceD2008.count} rows in the wassce_d2008 table"





# csv_text = File.read(Rails.root.join('lib', 'seeds', 'exams.csv'))
# csv = CSV.parse(csv_text.scrub, headers: true)
# #csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   t = Exam.new
#   t.exam_name = row['exam_name']
#   t.exam_diet = row['exam_diet']
#   t.table_name = row['table_name']
#   t.save
#   #puts "#{t.record_type}, #{t.exam_no} saved"
# end
# puts "There are now #{Exam.count} rows in the Exams table"





# csv_text = File.read(Rails.root.join('lib', 'seeds', 'subjects.csv'))
# csv = CSV.parse(csv_text.scrub, headers: true)
# #csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   t = Subject.new
#   t.SubjectCode = row['SubjectCode']
#   t.ExamYear = row['ExamYear']
#   t.ShortName = row['ShortName']
#   t.LongName = row['LongName']
#   t.ResultName = row['ResultName']
#   t.save
#   #puts "#{t.record_type}, #{t.exam_no} saved"
# end
# puts "There are now #{Subject.count} rows in the Subject table"




# csv_text = File.read(Rails.root.join('lib', 'seeds', 'offices.csv'))
# csv = CSV.parse(csv_text.scrub, headers: true)
# #csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   t = Office.new
#   t.name = row['name']
#   t.state = row['state']
#   t.save
#   #puts "#{t.record_type}, #{t.exam_no} saved"
# end
# puts "There are now #{Office.count} rows in the Offices table"


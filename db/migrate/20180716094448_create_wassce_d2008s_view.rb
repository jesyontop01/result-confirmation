class CreateWassceD2008sView < ActiveRecord::Migration
	def up
		execute %{
			CREATE VIEW Wassce_d2008vs AS
			SELECT
			Wassce_d2008s.id,
			Wassce_d2008s.exam_no,
			Sexes.sex_name,
      Wassce_d2008s.date_of_birth ,
     Wassce_d2008s.full_name ,
      SUBSTRING(Wassce_d2008s.results, 1, 3) AS subj1,
      SUBSTRING(Wassce_d2008s.results, 4, 1) AS result1,
      SUBSTRING(Wassce_d2008s.results, 5, 3) AS subj2,
      SUBSTRING(Wassce_d2008s.results, 8, 1) AS result2,
      SUBSTRING(Wassce_d2008s.results, 9, 3) AS subj3,
      SUBSTRING(Wassce_d2008s.results, 12, 1) AS result3,
      SUBSTRING(Wassce_d2008s.results, 13, 3) AS subj4,
      SUBSTRING(Wassce_d2008s.results, 16, 1) AS result4,
      SUBSTRING(Wassce_d2008s.results, 17, 3) AS subj5,
      SUBSTRING(Wassce_d2008s.results, 20, 1) AS result5,
      SUBSTRING(Wassce_d2008s.results, 21, 3) AS subj6,
      SUBSTRING(Wassce_d2008s.results, 24, 1) AS result6,
      SUBSTRING(Wassce_d2008s.results, 25, 3) AS subj7,
      SUBSTRING(Wassce_d2008s.results, 28, 1) AS result7,
      SUBSTRING(Wassce_d2008s.results, 29, 3) AS subj8,
      SUBSTRING(Wassce_d2008s.results, 32, 1) AS result8,
      SUBSTRING(Wassce_d2008s.results, 33, 3) AS subj9,
      SUBSTRING(Wassce_d2008s.results, 36, 1) AS result9,
     Wassce_d2008s.form_no 
      FROM
      Wassce_d2008s
       JOIN Sexes ON
  Wassce_d2008s.sex = Sexes.sex_code
		}
	end

	def down
		 execute "DROP VIEW Wassce_d2008vs"
	end

end

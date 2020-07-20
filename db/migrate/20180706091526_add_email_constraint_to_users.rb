class AddEmailConstraintToUsers < ActiveRecord::Migration
  def change
  end

  def up
  	execute %{
  		ALTER TABLE
  		users
  		ADD CONSTRAINT
  		email_must_be_company_email
  		CHECK ( email ~* '^[^@]+@waec\\.org.ng' ) 
  	}
  end

  def down
  	execute %{
  		ALTER TABLE
			users
		DROP CONSTRAINT
		email_must_be_company_email
  	}
  end
end

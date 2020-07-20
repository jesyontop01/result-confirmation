class Year < ActiveRecord::Base
	belongs_to :confirmation, dependent: :destroy
	#self.YearId = "YearTdl_Id"
end
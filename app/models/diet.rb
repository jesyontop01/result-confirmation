class Diet < ActiveRecord::Base
	belongs_to :confirmation, dependent: :destroy
	#self.DietId = "DietTdl_Id"
end
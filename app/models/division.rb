class Division < ActiveRecord::Base
	validates :name, presence: true 
	has_many :finance_depts
end

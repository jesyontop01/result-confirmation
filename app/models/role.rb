class Role < ActiveRecord::Base
	# has_many :assignments , dependent: :destroy
	# has_many :users, through: :assignments

	has_many :users

	validates :name, presence: true, uniqueness: true  
end

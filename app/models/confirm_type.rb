class ConfirmType < ActiveRecord::Base
	has_many :confirm_countries
	has_many :confirmations
end

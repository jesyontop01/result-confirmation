class WebService < ActiveRecord::Base
	validates :clientName, presence: true
	validates :clientURL, presence: true
end

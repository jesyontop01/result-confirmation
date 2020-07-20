class WassceD2008v < ActiveRecord::Base
self.primary_key = 'id'

def readonly?
	true
end
end

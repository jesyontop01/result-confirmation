class VerifierConnection < ActiveRecord::Base
    #self.abstract_class = true

    establish_connection "#{Rails.env}_sec".to_sym

end



class ConfirmCountry < ActiveRecord::Base
  belongs_to :confirm_type
  #belongs_to :confirmation
end

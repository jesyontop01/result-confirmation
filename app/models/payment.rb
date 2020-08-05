class Payment < ActiveRecord::Base
  belongs_to :diet
  belongs_to :year
  belongs_to :confirm_type
end

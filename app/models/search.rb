class Search < ActiveRecord::Base
  belongs_to :diet
  belongs_to :office
  belongs_to :confirm_type
end

class Dept < ActiveRecord::Base
  has_many :users
end

class Department < ActiveRecord::Base
  belongs_to :division
  has_many :users
end

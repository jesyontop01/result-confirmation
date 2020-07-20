class WaecPrivateExam < ActiveRecord::Base
  belongs_to :confirmation, dependent: :destroy
end

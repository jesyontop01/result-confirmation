class WaecExamSerializer < ActiveModel::Serializer
  attributes :id, :exam_name, :exam_diet, :table_name, :centre_table_name, :pix_folder
end

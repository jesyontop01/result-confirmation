class ReceiptStatus < ActiveRecord::Base
  belongs_to :ReceiptBooklet
  #has_many :confirmations, dependent: :destroy

  # after_create :check_receipt_booklet_availability

  # def check_receipt_booklet_availability
  # 	receipt_status = ReceiptStatus.find(:id)
  # 	params[:booklet_id] = receipt_status.receipt_booklet_id
  # 	 u = ReceiptStatus.where("receipt_booklet_id = ? AND status = ? ", params[:booklet_id], 'UNUSED') 
  # 	 if u.count == 0
  # 	 	ReceiptBooklet.find(params[:booklet_id]).update(status: "CLOSED") 
  # 	 	render json: {message: "Receipt Booklet range has no available receipt, \n please lodge new receipt value to continue"}

  # 	 else
  # 	 	render json: {message: "Receipt Leaflet remains #{u.count}"}
  # 	 end
  # end
end

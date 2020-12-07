class Payment < ActiveRecord::Base
  belongs_to :diet
  belongs_to :year
  belongs_to :confirm_type



  after_create :check_receipt_booklet_availability

  def check_receipt_booklet_availability
  	receipt_status = ReceiptStatus.find(receipt_status_id)
  	booklet_id = receipt_status.receipt_booklet_id
  	 u = ReceiptStatus.where("receipt_booklet_id = ? AND status = ? ", booklet_id, 'UNUSED') 
  	 if u.count == 0
  	 	ReceiptBooklet.find(booklet_id).update(status: "CLOSED") 
  	 	#render json: {message: "Receipt Booklet range has no available receipt, \n please lodge new receipt value to continue"}
  	 	puts  message: "Receipt Booklet range has no available receipt, \n please lodge new receipt value to continue"

  	 else
  	 	#render json: {message: "Receipt Leaflet remains #{u.count}"}
  	 	puts message: "Receipt Leaflet remains #{u.count}"
  	 end
  end
end

class LeafletsController < ApplicationController
  def index
  	params[:office_id] = current_user.office_id

    sql = <<-SQL

                            SELECT 
                                a.[id]
                                ,a.[receipt_booklet_id]
                                ,a.[receiptNo]
                                ,a.[status]
                                ,a.[created_at]
                                ,a.[updated_at]
                               , b.office_id
                            FROM [dbo].[receipt_statuses] a
                            inner join receipt_booklets b
                            on a.receipt_booklet_id = b.id
                           where b.status = 'open' AND b.office_id = '#{params[:office_id]}' AND a.status='unused'

            SQL
 

            @receipt_statuses = ActiveRecord::Base.connection.exec_query(sql)

            if @receipt_statuses.length == 0
              #ReceiptStatus.where("receipt_booklet_id = ? AND status = ? ", params[:booklet_id], 'UNUSED') 
               ReceiptBooklet.where("office_id = ?  AND status =?", params[:office_id], 'open').update(status: "CLOSED") 
              #ReceiptBooklet.find(params[:booklet_id]).update(status: "CLOSED")             
            end
      

    render json: @receipt_statuses
  end
end

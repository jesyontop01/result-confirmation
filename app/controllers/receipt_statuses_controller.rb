class ReceiptStatusesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_receipt_status, only: [:show, :edit, :update, :destroy]

  # GET /receipt_statuses
  # GET /receipt_statuses.json
  def index

   params[:office_id] = current_user.office_id

   if params[:receipt_no]
     params[:receiptNo] =  params[:receipt_no]
   else
     
   end

          if params[:receiptNo] && params[:office_id]

            sql = <<-SQL 
                       SELECT a.[id]
                      ,a.[receipt_booklet_id]
                      ,a.[receiptNo]
                      ,a.[status]
                      ,a.[created_at]
                      ,a.[updated_at]
                      FROM [verifierApp].[dbo].[receipt_statuses] a
                      inner join [verifierApp].[dbo].[receipt_booklets] b
                      on a.[receipt_booklet_id] = b.id 
                      where b.status = 'open' AND b.office_id = '#{params[:office_id]}' AND a.receiptNo = '#{params[:receiptNo]}'
            SQL

            @receipt_statuses = ActiveRecord::Base.connection.exec_query(sql)

          elsif params[:office_id]

             sql = <<-SQL

                                  SELECT top 1
                                a.[id]
                                ,a.[receipt_booklet_id]
                                ,a.[receiptNo]
                                ,a.[status]
                                ,a.[created_at]
                                ,a.[updated_at]
                              ,b.office_id
                            FROM [verifierApp].[dbo].[receipt_statuses] a
                            inner join receipt_booklets b
                            on a.receipt_booklet_id = b.id
                           where b.status = 'open' AND b.office_id = '#{params[:office_id]}' AND a.status='unused'

            SQL

            #       --where b.status='open' and a.receiptNo=40 and b.office_id = 21--    

            @receipt_statuses = ActiveRecord::Base.connection.exec_query(sql)
          
          else

             @receipt_statuses = ReceiptStatus.all

          end

    render json: @receipt_statuses

  end

  # GET /receipt_statuses/1
  # GET /receipt_statuses/1.json
  def show

      if params[:id]
        @receipt_status = ReceiptStatus.find(params[:id])
      end

     
      if params[:receiptNo]
            sql = <<-SQL 
                       SELECT a.[id]
                      ,a.[receipt_booklet_id]
                      ,a.[receiptNo]
                      ,a.[status]
                      ,a.[created_at]
                      ,a.[updated_at]
                      FROM [verifierApp].[dbo].[receipt_statuses] a
                      inner join [verifierApp].[dbo].[receipt_booklets] b
                      on a.[receipt_booklet_id] = b.id 
                      where b.status = 'open' AND a.receiptNo = '#{params[:receiptNo]}'
            SQL

            @receipt_status = ActiveRecord::Base.connection.exec_query(sql)
      end



    render json: @receipt_status
  end

  # GET /receipt_statuses/new
  def new
    @receipt_status = ReceiptStatus.new
  end

  # GET /receipt_statuses/1/edit
  def edit
     @receipt_status = ReceiptStatus.find(params[:id])
  end

  # POST /receipt_statuses
  # POST /receipt_statuses.json
  def create
    @receipt_status = ReceiptStatus.new(receipt_status_params)

    respond_to do |format|
      if @receipt_status.save
        format.html { redirect_to @receipt_status, notice: 'Receipt status was successfully created.' }
        format.json { render :show, status: :created, location: @receipt_status }
      else
        format.html { render :new }
        format.json { render json: @receipt_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /receipt_statuses/1
  # PATCH/PUT /receipt_statuses/1.json
  def update
     @receipt_status = ReceiptStatus.find(params[:id])
    respond_to do |format|
      if @receipt_status.update(receipt_status_params)
        format.html { redirect_to @receipt_status, notice: 'Receipt status was successfully updated.' }
        format.json { render :show, status: :ok, location: @receipt_status }
      else
        format.html { render :edit }
        format.json { render json: @receipt_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /receipt_statuses/1
  # DELETE /receipt_statuses/1.json
  def destroy
     @receipt_status = ReceiptStatus.find(params[:id])
    @receipt_status.destroy
    respond_to do |format|
      format.html { redirect_to receipt_statuses_url, notice: 'Receipt status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_receipt_status
      # if params[:id]
      #   @receipt_status = ReceiptStatus.find(params[:id])
      # end

     
      # if params[:receiptNo]
      #    @receipt_status = ReceiptStatus.find_by(:receiptNo => params[:receiptNo])
      # end
      
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def receipt_status_params
      params.require(:receipt_status).permit(:receipt_booklet_id, :receiptNo, :status, :confirmation_id)
    end
end

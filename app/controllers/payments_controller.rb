class PaymentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payment, only: [:show, :edit, :update, :destroy]
  load_and_authorize_resource

  # GET /payments
  # GET /payments.json
  

  def index

        params[:office_id] = current_user.office_id

    
    if ((current_user.role? :admin) || (current_user.role? :audit_admin)) #:audit_staff
    #@confirms = Confirmation.all.paginate(:page => params[:page], :per_page => 10).order("created_at DESC")

                if params[:WaecOfficeId] == "undefined" 

                        if params[:dateFrom] && params[:dateTo] 

                        sql = <<-SQL
                            SELECT [id]
                          ,[diet_id]
                          ,[year_id]
                          ,[exam_no]
                          ,[confirm_type_id]
                          ,[amount]
                          ,[receipt_no]
                          ,[created_at]
                          ,[updated_at]
                          ,[cand_email]
                          ,[user_id]
                          ,[office_id]
                          ,[printed]
                          ,[CandName]
                          ,[PhoneNo]
                          ,[transaction_type_id]
                          ,[receipt_status_id]
                      FROM [verifierApp].[dbo].[payments]
                      WHERE cast(created_at as date) between '#{params[:dateFrom]}' and '#{params[:dateTo]}';

                            SQL

                          @confirms = ActiveRecord::Base.connection.exec_query(sql)
                          
                        end

                

                  elsif params[:dateFrom] && params[:dateTo] && params[:WaecOfficeId]

                  sql = <<-SQL
                      SELECT [id]
                    ,[diet_id]
                    ,[year_id]
                    ,[exam_no]
                    ,[confirm_type_id]
                    ,[amount]
                    ,[receipt_no]
                    ,[created_at]
                    ,[updated_at]
                    ,[cand_email]
                    ,[user_id]
                    ,[office_id]
                    ,[printed]
                    ,[CandName]
                    ,[PhoneNo]
                    ,[transaction_type_id]
                    ,[receipt_status_id]
                FROM [verifierApp].[dbo].[payments]
                WHERE cast(created_at as date) between '#{params[:dateFrom]}' and '#{params[:dateTo]}' AND office_id = '#{params[:WaecOfficeId]}';

                      SQL

                    @confirms = ActiveRecord::Base.connection.exec_query(sql)



              else
                         sql = <<-SQL 

                  SELECT
                  a.[id], a.[CandName], a.[PhoneNo], a.[amount], b.[transName], a.[cand_email], a.[created_at], c.[office_name], a.[receipt_no], d.[typeName]
                  FROM [verifierApp].[dbo].[payments] a
                  inner join [verifierApp].[dbo].[transaction_types] b
                  on a.transaction_type_id = b.id
                  inner join [verifierApp].[dbo].[offices] c
                  on a.office_id = c.id
                  inner join [verifierApp].[dbo].[confirm_types] d
                  on a.confirm_type_id = d.id
                

                SQL

                    @confirms = ActiveRecord::Base.connection.exec_query(sql)

              end




      else
        

             sql = <<-SQL 

          SELECT
          a.[id], a.[CandName], a.[PhoneNo], a.[amount], b.[transName], a.[cand_email], a.[created_at], c.[office_name], a.[receipt_no], d.[typeName]
          FROM [verifierApp].[dbo].[payments] a
          inner join [verifierApp].[dbo].[transaction_types] b
          on a.transaction_type_id = b.id
          inner join [verifierApp].[dbo].[offices] c
          on a.office_id = c.id
          inner join [verifierApp].[dbo].[confirm_types] d
          on a.confirm_type_id = d.id
          where a.office_id = '#{params[:office_id]}' and a.printed = 'false'

        SQL

            @confirms = ActiveRecord::Base.connection.exec_query(sql)
        end 


   

      respond_to do |format|
      format.html {}
      format.json { render json: @confirms }
    end
    #@payments = Payment.all
    #render json: @payments 
  end

  # GET /payments/1
  # GET /payments/1.json
  def show
    render json: @payment
  end

  # GET /payments/new
  def new
    @payment = Payment.new
  end

  # GET /payments/1/edit
  def edit
  end

  # POST /payments
  # POST /payments.json
  def create
    @payment = Payment.new(payment_params)

    respond_to do |format|
      if @payment.save
        @payment.update(:user_id => current_user.id)
        @payment.update(:office_id => current_user.office_id)

                 if params[:receipt_status_id] 
#binding.pry
                  #params[:office_id] = current_user.office_id

                  @receipt_status = ReceiptStatus.find_by(:id => params[:receipt_status_id])

                  @receipt_status.update(:status => 'USED')
                  #@receipt_status.update(confirmation_id: @confirm.id )
                 end

        format.html { redirect_to @payment, notice: 'Payment was successfully created.' }
        format.json { render :show, status: :created, location: @payment }
      else
        format.html { render :new }
        format.json { render json: @payment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /payments/1
  # PATCH/PUT /payments/1.json
  def update
    respond_to do |format|
      if @payment.update(payment_params)
        format.html { redirect_to @payment, notice: 'Payment was successfully updated.' }
        format.json { render :show, status: :ok, location: @payment }
      else
        format.html { render :edit }
        format.json { render json: @payment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /payments/1
  # DELETE /payments/1.json
  def destroy
    @payment.destroy
    respond_to do |format|
      format.html { redirect_to payments_url, notice: 'Payment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def receipt_payment_details
     params[:office_id] = current_user.office_id

      if params[:receiptNo]
          
          sql = <<-SQL 

            SELECT
            a.[id], a.[CandName], a.[PhoneNo], a.[amount], b.[transName], a.[cand_email], a.[created_at], c.[office_name], a.[receipt_no], d.[typeName]
            FROM [verifierApp].[dbo].[payments] a
            inner join [verifierApp].[dbo].[transaction_types] b
            on a.transaction_type_id = b.id
            inner join [verifierApp].[dbo].[offices] c
            on a.office_id = c.id
            inner join [verifierApp].[dbo].[confirm_types] d
            on a.confirm_type_id = d.id
            where a.office_id = '#{params[:office_id]}' and a.[receipt_no] = '#{params[:receiptNo]}'

          SQL

              @payment = ActiveRecord::Base.connection.exec_query(sql)
      end

      if @payment.length == 0

         render json: {success: false, message: "Payment not found for this Receipt No." }
        
      else
         render json: {success: true, payment: @payment }
        
      end

     


  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment
      @payment = Payment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def payment_params
      params.require(:payment).permit(:diet_id, :year_id, :exam_no, :confirm_type_id, :amount, :receipt_no,
                       :cand_email, :printed, :user_id, :office_id, :CandName, :PhoneNo, :transaction_type_id, :receipt_status_id)
    end
end


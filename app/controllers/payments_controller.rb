class PaymentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payment, only: [:show, :edit, :update, :destroy]

  # GET /payments
  # GET /payments.json
  def index

        params[:office_id] = current_user.office_id

    
    if current_user.audit_role?
    #@confirms = Confirmation.all.paginate(:page => params[:page], :per_page => 10).order("created_at DESC")

                 sql = <<-SQL 

          SELECT  
          a.[id] ,a.[user_id] ,b.[DietName], c.[YearName], a.[ref_no],a.[exam_no]
            ,a.[Cand_address] ,a.[dest_title] ,a.[dest_address1] ,a.[dest_address2]
            ,a.[dest_location] ,a.[dest_email] ,a.[created_at] ,a.[updated_at] ,d.[office_name]
            ,e.[typeName] ,f.[countryName] ,a.[receipt_no]
          FROM [verifierApp].[dbo].[payments] a
          inner join [verifierApp].[dbo].[Diets] b
          on a.diet_id = b.id
          inner join [verifierApp].[dbo].[Years] c
          on a.year_id = c.id
          inner join [verifierApp].[dbo].[offices] d
          on a.office_id = d.id
          inner join [verifierApp].[dbo].[confirm_types] e
          on a.confirm_type_id = e.id
          inner join [verifierApp].[dbo].[confirm_countries] f
          on a.confirm_country_id = f.id

        SQL

            @confirms = ActiveRecord::Base.connection.exec_query(sql)


      else

             sql = <<-SQL 

          SELECT  
          a.[id], b.[DietName], c.[YearName], a.[exam_no], a.[cand_email], a.[created_at], d.[office_name], a.[receipt_no]
          FROM [verifierApp].[dbo].[payments] a
          inner join [verifierApp].[dbo].[Diets] b
          on a.diet_id = b.id
          inner join [verifierApp].[dbo].[Years] c
          on a.year_id = c.id
          inner join [verifierApp].[dbo].[offices] d
          on a.office_id = d.id
          where a.office_id = '#{params[:office_id]}' and a.printed = 'false'

        SQL

            @confirms = ActiveRecord::Base.connection.exec_query(sql)
        end 


   #   

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

                 if params[:receiptID] 

                  #params[:office_id] = current_user.office_id

                  @receipt_status = ReceiptStatus.find_by(:id => params[:receiptID])


                  @receipt_status.update(status: 'USED')
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment
      @payment = Payment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def payment_params
      params.require(:payment).permit(:diet_id, :year_id, :exam_no, :confirm_type_id, :amount, :receipt_no, :cand_email, :printed, :user_id, :office_id)
    end
end
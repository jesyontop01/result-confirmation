class ReceiptBookletsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_receipt_booklet, only: [:show, :edit, :update, :destroy]

  # GET /receipt_booklets
  # GET /receipt_booklets.json
  def index
    @receipt_booklets = ReceiptBooklet.all
  end

  # GET /receipt_booklets/1
  # GET /receipt_booklets/1.json
  def show
  end

  # GET /receipt_booklets/new
  def new
    @receipt_booklet = ReceiptBooklet.new
  end

  # GET /receipt_booklets/1/edit
  def edit
  end

  # POST /receipt_booklets
  # POST /receipt_booklets.json
  def create
    #@user = User.find(:current_user.id)
    #@receipt_booklet = ReceiptBooklet.new(receipt_booklet_params)
    @receipt_booklet = current_user.receipt_booklets.build(receipt_booklet_params)


    respond_to do |format|
      if @receipt_booklet.save
        #@receipt_booklet.update_attribute(:office_id => current_user.office_id)
          ( @receipt_booklet.rangeFrom..@receipt_booklet.rangeTo ).to_a.each do |receipt| 
            @receipt_status = ReceiptStatus.create(:receipt_booklet_id=>@receipt_booklet.id , :receiptNo=> receipt)
          end
          if @receipt_status.save
            @receipt_statuses = ReceiptStatus.where(:receipt_booklet_id => @receipt_booklet.id )
          end

        #format.html { redirect_to @receipt_booklet, notice: 'Receipt booklet was successfully created.' }
        #format.json { render json: @receipt_statuses}
        format.json { render json: @receipt_booklet, notice: 'Receipt booklet was successfully created.'}
      else
        format.html { render :new }
        format.json { render json: @receipt_booklet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /receipt_booklets/1
  # PATCH/PUT /receipt_booklets/1.json
  def update
    respond_to do |format|
      if @receipt_booklet.update(receipt_booklet_params)
        format.html { redirect_to @receipt_booklet, notice: 'Receipt booklet was successfully updated.' }
        format.json { render :show, status: :ok, location: @receipt_booklet }
      else
        format.html { render :edit }
        format.json { render json: @receipt_booklet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /receipt_booklets/1
  # DELETE /receipt_booklets/1.json
  def destroy
    @receipt_booklet.destroy
    respond_to do |format|
      format.html { redirect_to receipt_booklets_url, notice: 'Receipt booklet was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_receipt_booklet
      @receipt_booklet = ReceiptBooklet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def receipt_booklet_params
      params.require(:receipt_booklet).permit(:rangeFrom, :status, :rangeTo, :office_id , :user_id =>current_user.id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def receipt_status_params
      params.require(:receipt_status).permit(:receipt_booklet_id, :receiptNo, :status)
    end
end

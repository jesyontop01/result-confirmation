class ReceiptCorrectionsController < ApplicationController
   before_action :authenticate_user!
  before_action :set_receipt_correction, only: [:show, :edit, :update, :destroy]
  load_and_authorize_resource

  # GET /receipt_corrections
  # GET /receipt_corrections.json
  def index
    @receipt_corrections = ReceiptCorrection.all
  end

  # GET /receipt_corrections/1
  # GET /receipt_corrections/1.json
  def show
  end

  # GET /receipt_corrections/new
  def new
    @receipt_correction = ReceiptCorrection.new
  end

  # GET /receipt_corrections/1/edit
  def edit
  end

  # POST /receipt_corrections
  # POST /receipt_corrections.json
  def create
    @receipt_correction = ReceiptCorrection.new(receipt_correction_params)

    respond_to do |format|
      if @receipt_correction.save
        format.html { redirect_to @receipt_correction, notice: 'Receipt correction was successfully created.' }
        format.json { render :show, status: :created, location: @receipt_correction }
      else
        format.html { render :new }
        format.json { render json: @receipt_correction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /receipt_corrections/1
  # PATCH/PUT /receipt_corrections/1.json
  def update
    respond_to do |format|
      if @receipt_correction.update(receipt_correction_params)
        format.html { redirect_to @receipt_correction, notice: 'Receipt correction was successfully updated.' }
        format.json { render :show, status: :ok, location: @receipt_correction }
      else
        format.html { render :edit }
        format.json { render json: @receipt_correction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /receipt_corrections/1
  # DELETE /receipt_corrections/1.json
  def destroy
    @receipt_correction.destroy
    respond_to do |format|
      format.html { redirect_to receipt_corrections_url, notice: 'Receipt correction was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_receipt_correction
      @receipt_correction = ReceiptCorrection.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def receipt_correction_params
      params.require(:receipt_correction).permit(:receipt_status_id, :user_id)
    end
end

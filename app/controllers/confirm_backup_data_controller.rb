class ConfirmBackupDataController < ApplicationController
  before_action :set_confirm_backup_datum, only: %i[ show edit update destroy ]

  # GET /confirm_backup_data or /confirm_backup_data.json
  def index
    @confirm_backup_data = ConfirmBackupDatum.all
  end

  # GET /confirm_backup_data/1 or /confirm_backup_data/1.json
  def show
  end

  # GET /confirm_backup_data/new
  def new
    @confirm_backup_datum = ConfirmBackupDatum.new
  end

  # GET /confirm_backup_data/1/edit
  def edit
  end

  # POST /confirm_backup_data or /confirm_backup_data.json
  def create
    @confirm_backup_datum = ConfirmBackupDatum.new(confirm_backup_datum_params)

    respond_to do |format|
      if @confirm_backup_datum.save
        format.html { redirect_to confirm_backup_datum_url(@confirm_backup_datum), notice: "Confirm backup datum was successfully created." }
        format.json { render :show, status: :created, location: @confirm_backup_datum }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @confirm_backup_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /confirm_backup_data/1 or /confirm_backup_data/1.json
  def update
    respond_to do |format|
      if @confirm_backup_datum.update(confirm_backup_datum_params)
        format.html { redirect_to confirm_backup_datum_url(@confirm_backup_datum), notice: "Confirm backup datum was successfully updated." }
        format.json { render :show, status: :ok, location: @confirm_backup_datum }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @confirm_backup_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /confirm_backup_data/1 or /confirm_backup_data/1.json
  def destroy
    @confirm_backup_datum.destroy

    respond_to do |format|
      format.html { redirect_to confirm_backup_data_url, notice: "Confirm backup datum was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_confirm_backup_datum
      @confirm_backup_datum = ConfirmBackupDatum.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def confirm_backup_datum_params
      params.require(:confirm_backup_datum).permit(:confirmation_id, :CandNo, :Results, :FormNo, :Surname, :FirstName, :OtherNames, :DOB, :Sex, :Pix, :CentreName, :CertificateNo, :SecurityDigit, :Award, :CertificateStatus, :DatePrinted, :ExamTitle)
    end
end

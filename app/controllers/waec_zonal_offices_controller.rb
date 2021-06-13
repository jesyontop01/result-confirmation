class WaecZonalOfficesController < ApplicationController
  before_action :set_waec_zonal_office, only: [:show, :edit, :update, :destroy]

  # GET /waec_zonal_offices
  # GET /waec_zonal_offices.json
  def index
    @waec_zonal_offices = WaecZonalOffice.all
  end

  # GET /waec_zonal_offices/1
  # GET /waec_zonal_offices/1.json
  def show
  end

  # GET /waec_zonal_offices/new
  def new
    @waec_zonal_office = WaecZonalOffice.new
  end

  # GET /waec_zonal_offices/1/edit
  def edit
  end

  # POST /waec_zonal_offices
  # POST /waec_zonal_offices.json
  def create
    @waec_zonal_office = WaecZonalOffice.new(waec_zonal_office_params)

    respond_to do |format|
      if @waec_zonal_office.save
        format.html { redirect_to @waec_zonal_office, notice: 'Waec zonal office was successfully created.' }
        format.json { render :show, status: :created, location: @waec_zonal_office }
      else
        format.html { render :new }
        format.json { render json: @waec_zonal_office.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /waec_zonal_offices/1
  # PATCH/PUT /waec_zonal_offices/1.json
  def update
    respond_to do |format|
      if @waec_zonal_office.update(waec_zonal_office_params)
        format.html { redirect_to @waec_zonal_office, notice: 'Waec zonal office was successfully updated.' }
        format.json { render :show, status: :ok, location: @waec_zonal_office }
      else
        format.html { render :edit }
        format.json { render json: @waec_zonal_office.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /waec_zonal_offices/1
  # DELETE /waec_zonal_offices/1.json
  def destroy
    @waec_zonal_office.destroy
    respond_to do |format|
      format.html { redirect_to waec_zonal_offices_url, notice: 'Waec zonal office was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_waec_zonal_office
      @waec_zonal_office = WaecZonalOffice.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def waec_zonal_office_params
      params.require(:waec_zonal_office).permit(:ZoneName, :offices_id)
    end
end

class WaecCentresController < ApplicationController
  before_action :set_waec_centre, only: [:show, :edit, :update, :destroy]

  # GET /waec_centres
  # GET /waec_centres.json
  def index
    @waec_centres = WaecCentre.all
  end

  # GET /waec_centres/1
  # GET /waec_centres/1.json
  def show
  end

  # GET /waec_centres/new
  def new
    @waec_centre = WaecCentre.new
  end

  # GET /waec_centres/1/edit
  def edit
  end

  # POST /waec_centres
  # POST /waec_centres.json
  def create
    @waec_centre = WaecCentre.new(waec_centre_params)

    respond_to do |format|
      if @waec_centre.save
        format.html { redirect_to @waec_centre, notice: 'Waec centre was successfully created.' }
        format.json { render :show, status: :created, location: @waec_centre }
      else
        format.html { render :new }
        format.json { render json: @waec_centre.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /waec_centres/1
  # PATCH/PUT /waec_centres/1.json
  def update
    respond_to do |format|
      if @waec_centre.update(waec_centre_params)
        format.html { redirect_to @waec_centre, notice: 'Waec centre was successfully updated.' }
        format.json { render :show, status: :ok, location: @waec_centre }
      else
        format.html { render :edit }
        format.json { render json: @waec_centre.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /waec_centres/1
  # DELETE /waec_centres/1.json
  def destroy
    @waec_centre.destroy
    respond_to do |format|
      format.html { redirect_to waec_centres_url, notice: 'Waec centre was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_waec_centre
      @waec_centre = WaecCentre.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def waec_centre_params
      params.require(:waec_centre).permit(:centre_no, :centre_type, :centre_name)
    end
end

class WebServicesController < ApplicationController
  before_action :set_web_service, only: [:show, :edit, :update, :destroy]

  # GET /web_services
  # GET /web_services.json
  def index
    @web_services = WebService.all
  end

  # GET /web_services/1
  # GET /web_services/1.json
  def show
  end

  # GET /web_services/new
  def new
    @web_service = WebService.new
  end

  # GET /web_services/1/edit
  def edit
  end

  # POST /web_services
  # POST /web_services.json
  def create
    @web_service = WebService.new(web_service_params)

    respond_to do |format|
      if @web_service.save
        format.html { redirect_to @web_service, notice: 'Web service was successfully created.' }
        format.json { render :show, status: :created, location: @web_service }
      else
        format.html { render :new }
        format.json { render json: @web_service.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /web_services/1
  # PATCH/PUT /web_services/1.json
  def update
    respond_to do |format|
      if @web_service.update(web_service_params)
        format.html { redirect_to @web_service, notice: 'Web service was successfully updated.' }
        format.json { render :show, status: :ok, location: @web_service }
      else
        format.html { render :edit }
        format.json { render json: @web_service.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /web_services/1
  # DELETE /web_services/1.json
  def destroy
    @web_service.destroy
    respond_to do |format|
      format.html { redirect_to web_services_url, notice: 'Web service was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_web_service
      @web_service = WebService.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def web_service_params
      params.require(:web_service).permit(:clientName, :clientAddress)
    end
end

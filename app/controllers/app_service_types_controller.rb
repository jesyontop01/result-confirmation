class AppServiceTypesController < ApplicationController
  before_action :set_app_service_type, only: %i[ show edit update destroy ]

  # GET /app_service_types or /app_service_types.json
  def index
    
      user = current_user
      
      if user.office.office_name.strip! == "Yaba"
         
        @app_service_types = AppServiceType.all
          #binding.pry
        render json: {success: true, data: @app_service_types, message:"You are authorized"}
        ##format.json { render success: true, data: @web_services, message:"You are authorized"}
       else
        render json: {success: false, message:"Sorry!, access is denied for your office"}
  
       end
  
  end

  # GET /app_service_types/1 or /app_service_types/1.json
  def show
  end

  # GET /app_service_types/new
  def new
    @app_service_type = AppServiceType.new
  end

  # GET /app_service_types/1/edit
  def edit
  end

  # POST /app_service_types or /app_service_types.json
  def create
    @app_service_type = AppServiceType.new(app_service_type_params)

    respond_to do |format|
      if @app_service_type.save
        format.html { redirect_to app_service_type_url(@app_service_type), notice: "App service type was successfully created." }
        format.json { render :show, status: :created, location: @app_service_type }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @app_service_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /app_service_types/1 or /app_service_types/1.json
  def update
    respond_to do |format|
      if @app_service_type.update(app_service_type_params)
        format.html { redirect_to app_service_type_url(@app_service_type), notice: "App service type was successfully updated." }
        format.json { render :show, status: :ok, location: @app_service_type }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @app_service_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /app_service_types/1 or /app_service_types/1.json
  def destroy
    @app_service_type.destroy

    respond_to do |format|
      format.html { redirect_to app_service_types_url, notice: "App service type was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_app_service_type
      @app_service_type = AppServiceType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def app_service_type_params
      params.require(:app_service_type).permit(:ServiceType)
    end
end

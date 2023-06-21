class WebServiceFileUploadResponsesController < ApplicationController
  before_action :set_web_service_file_upload_response, only: %i[ show edit update destroy ]

  # GET /web_service_file_upload_responses or /web_service_file_upload_responses.json
  def index
    @web_service_file_upload_responses = WebServiceFileUploadResponse.all
  end

  # GET /web_service_file_upload_responses/1 or /web_service_file_upload_responses/1.json
  def show
  end

  # GET /web_service_file_upload_responses/new
  def new
    @web_service_file_upload_response = WebServiceFileUploadResponse.new
  end

  # GET /web_service_file_upload_responses/1/edit
  def edit
  end

  # POST /web_service_file_upload_responses or /web_service_file_upload_responses.json
  def create
    @web_service_file_upload_response = WebServiceFileUploadResponse.new(web_service_file_upload_response_params)

    respond_to do |format|
      if @web_service_file_upload_response.save
        format.html { redirect_to web_service_file_upload_response_url(@web_service_file_upload_response), notice: "Web service file upload response was successfully created." }
        format.json { render :show, status: :created, location: @web_service_file_upload_response }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @web_service_file_upload_response.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /web_service_file_upload_responses/1 or /web_service_file_upload_responses/1.json
  def update
    respond_to do |format|
      if @web_service_file_upload_response.update(web_service_file_upload_response_params)
        format.html { redirect_to web_service_file_upload_response_url(@web_service_file_upload_response), notice: "Web service file upload response was successfully updated." }
        format.json { render :show, status: :ok, location: @web_service_file_upload_response }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @web_service_file_upload_response.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /web_service_file_upload_responses/1 or /web_service_file_upload_responses/1.json
  def destroy
    @web_service_file_upload_response.destroy

    respond_to do |format|
      format.html { redirect_to web_service_file_upload_responses_url, notice: "Web service file upload response was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_web_service_file_upload_response
      @web_service_file_upload_response = WebServiceFileUploadResponse.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def web_service_file_upload_response_params
      params.require(:web_service_file_upload_response).permit(:confirmation_id, :clientUploadId, :referenceNumber, :status, :uploadId)
    end
end

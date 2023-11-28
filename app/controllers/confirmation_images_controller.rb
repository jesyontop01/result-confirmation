class ConfirmationImagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_confirmation_image, only: %i[ show edit update destroy ]

  # GET /confirmation_images or /confirmation_images.json
  def index
    @confirmation_images = ConfirmationImage.all
  end

  # GET /confirmation_images/1 or /confirmation_images/1.json
  def show
  end

  # GET /confirmation_images/new
  def new
    @confirmation_image = ConfirmationImage.new
  end

  # GET /confirmation_images/1/edit
  def edit
  end

  # POST /confirmation_images or /confirmation_images.json
  def create 

    @confirmation_image = ConfirmationImage.new

    if params[:filetype].present? && params[:filename].present? && params[:filesize].present? && params[:base64].present? && params[:dietId].present? && params[:candNo].present?
      
      @confirmation_image.filetype = params[:filetype]
      @confirmation_image.filename = params[:filename]
      @confirmation_image.filesize = params[:filesize]
      @confirmation_image.base64 = params[:base64]
      @confirmation_image.dietId = params[:dietId]
      @confirmation_image.candNo = params[:candNo]
      @confirmation_image.user_id = current_user.id

    end

    #binding.pry

    respond_to do |format|
      if @confirmation_image.save
        #format.html { redirect_to confirmation_image_url(@confirmation_image), notice: "Confirmation image was successfully created." }
        format.json { render json: @confirmation_image, status: :ok}
      else
        #format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @confirmation_image.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /confirmation_images/1 or /confirmation_images/1.json
  def update
    respond_to do |format|
      if @confirmation_image.update(confirmation_image_params)
        format.html { redirect_to confirmation_image_url(@confirmation_image), notice: "Confirmation image was successfully updated." }
        format.json { render :show, status: :ok, location: @confirmation_image }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @confirmation_image.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /confirmation_images/1 or /confirmation_images/1.json
  def destroy
    @confirmation_image.destroy

    respond_to do |format|
      format.html { redirect_to confirmation_images_url, notice: "Confirmation image was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def decode_base64
    decoded_data = Base64.decode64(params[:confirmation_image][:base64])
    data = StringIO.new(decoded_data)
    data
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_confirmation_image
      @confirmation_image = ConfirmationImage.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def confirmation_image_params
      params.require(:confirmation_image).permit(:filetype, :filename, :filesize, :base64, :dietId, :candNo, :user_id)
    end
end

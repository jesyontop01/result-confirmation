class PackingListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_packing_list, only: [:show, :edit, :update, :destroy]
 load_and_authorize_resource
  # GET /packing_lists
  # GET /packing_lists.json
  def index
    ##@packing_lists = PackingList.all
    @packing_lists = PackingList.joins(:waec_office)
                        .select("packing_lists.*, waec_offices.State_Name")

      respond_to do |format|
      if @packing_lists
        format.json {render json:{success: true, data: @packing_lists }}
      else
        format.json { render json:{ success: false, data: @packing_lists.errors, status: :unprocessable_entity} }
      end
    end
  end

  # GET /packing_lists/1
  # GET /packing_lists/1.json
  def show
  end

  # GET /packing_lists/new
  def new
    @packing_list = PackingList.new
  end

  # GET /packing_lists/1/edit
  def edit
  end

  # POST /packing_lists
  # POST /packing_lists.json
  def create
    @packing_list = PackingList.new(packing_list_params)
  

    respond_to do |format|
      if @packing_list.save
        format.html { redirect_to @packing_list, notice: 'Packing list was successfully created.' }
        format.json {render json:{success: true, data: @packing_list , location: @packing_list}}
      else
        format.html { render :new }
        format.json { render json:{ success: false, data: @packing_list.errors, status: :unprocessable_entity} }
      end
    end
  end

  # PATCH/PUT /packing_lists/1
  # PATCH/PUT /packing_lists/1.json
  def update
    respond_to do |format|
      if @packing_list.update(packing_list_params)
        format.html { redirect_to @packing_list, notice: 'Packing list was successfully updated.' }
        format.json { render :show, status: :ok, location: @packing_list }
      else
        format.html { render :edit }
        format.json { render json: @packing_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /packing_lists/1
  # DELETE /packing_lists/1.json
  def destroy
    @packing_list.destroy
    respond_to do |format|
      format.html { redirect_to packing_lists_url, notice: 'Packing list was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # def make_zip

  #     # Path where your pdfs are situated (‘my_pdf’ is folder with pdfs)
  #     folder = "#{Rails.root}/public/uploads/attachment/"
  #     input_filenames = Dir.entries("#{Rails.root}/public/uploads/attachment/#{@model.attachment}").select {|f| !File.directory? f}

  #     zipfile_name = "#{Rails.root}/public/uploads/attachment/#{@model.attachment}"
  #     Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
  #     input_filenames.each do |filename|
  #     # Two arguments:
  #     # – The name of the file as it will appear in the archive
  #     # – The original file, including the path to find it
  #     zipfile.add(filename,  File.join(folder, filename))
  #     end
  #     zipfile.get_output_stream(“success”) { |os| os.write “All done successfully” }
  #     end
  #     send_file(File.join("#{Rails.root}/public/uploads/attachment", @model.attachment), :type => "application/zip", :filename => "#{@model.attachment}.zip")
  #     # Remove content from ‘my_pdfs’ folder if you want
  #     #FileUtils.rm_rf(Dir.glob("#{Rails.root}/public/my_pdfs/*)")
  #     FileUtils.rm_rf(Dir.glob("#{Rails.root}/public/uploads/attachment/#{@model.attachment}/*)")

  # end


  def download_file
     require 'open-uri'
    @packing_list = @model = PackingList.find(params[:id])
    # send_file(File.join("#{Rails.root}/public/#{@model.attachment}"), 
    #   :type => "application/zip", 
    #   :disposition => 'attachment',
    #   x_sendfile: true,
    #   :filename => "#{@model.attachment}.zip")



        # File.open("#{Rails.root}/public/#{@model.attachment}", 'r') do |f|
        # send_data f.read, :type => "application/zip",
        #     :disposition => 'attachment', 
        #     :filename => "#{@model.attachment}"
        # end


       
        url = "#{Rails.root}/public/#{@model.attachment}"
        data = open(url).read
        send_data data, :disposition => 'attachment', :filename=>"photo.zip"

    # @packing_list = send_data(@model.attachment_url,
    #       :filename => @model.attachment,
    #       :type => @model.attachment.content_type,
    #       :disposition => 'attachment',
    #       :url_based_filename => true)
    # binding.pry
     # render json:{data: @packing_list, status: "success" }
  end

       def download_file3
        @model = PackingList.find(params[:id])
        send_file(@model.attachment_url,
              :filename => @model.attachment,
              :disposition => 'attachment',
              :url_based_filename => false)
      end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_packing_list
      @packing_list = PackingList.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def packing_list_params
      ##params.require(:packing_list).permit( :attachment, :waec_office_id)
      params.permit( :attachment, :waec_office_id)
    end
end

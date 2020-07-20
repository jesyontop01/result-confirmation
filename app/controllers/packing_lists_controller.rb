class PackingListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_packing_list, only: [:show, :edit, :update, :destroy]

  # GET /packing_lists
  # GET /packing_lists.json
  def index
    @packing_lists = PackingList.all
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
        format.json { render :show, status: :created, location: @packing_list }
      else
        format.html { render :new }
        format.json { render json: @packing_list.errors, status: :unprocessable_entity }
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_packing_list
      @packing_list = PackingList.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def packing_list_params
      params.require(:packing_list).permit(:office, :attachment)
    end
end

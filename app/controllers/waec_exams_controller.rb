class WaecExamsController < ApplicationController
  before_action :set_waec_exam, only: [:show, :edit, :update, :destroy]

  # GET /waec_exams
  # GET /waec_exams.json
  def index
    @waec_exams = WaecExam.all
  end

  # GET /waec_exams/1
  # GET /waec_exams/1.json
  def show
  end

  # GET /waec_exams/new
  def new
    @waec_exam = WaecExam.new
  end

  # GET /waec_exams/1/edit
  def edit
  end

  # POST /waec_exams
  # POST /waec_exams.json
  def create
    @waec_exam = WaecExam.new(waec_exam_params)

    respond_to do |format|
      if @waec_exam.save
        format.html { redirect_to @waec_exam, notice: 'Waec exam was successfully created.' }
        format.json { render :show, status: :created, location: @waec_exam }
      else
        format.html { render :new }
        format.json { render json: @waec_exam.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /waec_exams/1
  # PATCH/PUT /waec_exams/1.json
  def update
    respond_to do |format|
      if @waec_exam.update(waec_exam_params)
        format.html { redirect_to @waec_exam, notice: 'Waec exam was successfully updated.' }
        format.json { render :show, status: :ok, location: @waec_exam }
      else
        format.html { render :edit }
        format.json { render json: @waec_exam.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /waec_exams/1
  # DELETE /waec_exams/1.json
  def destroy
    @waec_exam.destroy
    respond_to do |format|
      format.html { redirect_to waec_exams_url, notice: 'Waec exam was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_waec_exam
      @waec_exam = WaecExam.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def waec_exam_params
      params.require(:waec_exam).permit(:exam_name, :exam_diet, :table_name, :centre_table_name, :pix_folder)
    end
end

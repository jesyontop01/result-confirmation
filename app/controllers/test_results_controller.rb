class TestResultsController < ApplicationController
  before_action :set_test_result, only: [:show, :edit, :update, :destroy]

  # GET /test_results
  # GET /test_results.json
  def index

      if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

            @year = Year.find_by(:YearName => params[:YearName])
            params[:yearId] = @year.id

            @diet = Diet.find_by(:DietName => params[:DietName])
            params[:dietId] = @diet.id
      
  

          if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

                sql = <<-SQL 
          
                  SELECT 
                      *
                  FROM [verifierApp].[dbo].[test_results]
                  where yearId = '#{params[:yearId]}' and dietId = '#{params[:dietId]}'  and CandNo='#{params[:CandNo]}'

                SQL

                    @test_results = ActiveRecord::Base.connection.exec_query(sql)
          end

      #end
     
      

      elsif params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

                sql = <<-SQL 
          
                  SELECT 
                      *
                  FROM [verifierApp].[dbo].[test_results]
                  where yearId = '#{params[:yearId]}' and dietId = '#{params[:dietId]}'  and CandNo='#{params[:CandNo]}'

                SQL

                    @test_results = ActiveRecord::Base.connection.exec_query(sql)

      else

        @test_results = TestResult.all

      end


            respond_to do |format|
            format.html {}
            format.json { render json: @test_results }
          end


    
    
  end

  # GET /test_results/1
  # GET /test_results/1.json
  def show
  end

  # GET /test_results/new
  def new
    @test_result = TestResult.new
  end

  # GET /test_results/1/edit
  def edit
  end

  # POST /test_results
  # POST /test_results.json
  def create
    @test_result = TestResult.new(test_result_params)

    respond_to do |format|
      if @test_result.save
        format.html { redirect_to @test_result, notice: 'Test result was successfully created.' }
        format.json { render :show, status: :created, location: @test_result }
      else
        format.html { render :new }
        format.json { render json: @test_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /test_results/1
  # PATCH/PUT /test_results/1.json
  def update
    respond_to do |format|
      if @test_result.update(test_result_params)
        format.html { redirect_to @test_result, notice: 'Test result was successfully updated.' }
        format.json { render :show, status: :ok, location: @test_result }
      else
        format.html { render :edit }
        format.json { render json: @test_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /test_results/1
  # DELETE /test_results/1.json
  def destroy
    @test_result.destroy
    respond_to do |format|
      format.html { redirect_to test_results_url, notice: 'Test result was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_test_result
      @test_result = TestResult.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def test_result_params
      params.require(:test_result).permit(:Picture, :ExamDiet, :ExamYear, :CandNo, :CandName, :Sex, :DOB, :CentreName, :Subject1, :Grade1, :Subject2, :Grade2, :Subject3, :Grade3, :Subject4, :Grade4, :Subject5, :Grade5, :Subject6, :Grade6, :Subject7, :Grade7, :Subject8, :Grade8, :Subject9, :Grade9, :NoOfSubjects, :yearId, :dietId)
    end
end

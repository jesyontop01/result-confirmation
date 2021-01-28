class FinanceDeptsController < ApplicationController
 # before_action :set_finance_dept, only: [:show, :edit, :update, :destroy]

  # GET /divisions
  # GET /divisions.json
  def index
  	if params[:division_id]

  		sql = <<-SQL 

          SELECT
          a.[id], a.[name], b.[name] as division
          FROM [verifierApp].[dbo].[finance_depts] a
          inner join [verifierApp].[dbo].[divisions] b
          on a.division_id = b.id
          where a.division_id = '#{params[:division_id]}' 

        SQL

           @finance_depts = ActiveRecord::Base.connection.exec_query(sql)

  	else
  	
  	@finance_depts = FinanceDept.all
  	#render json: @finance_depts

  	end
    #@finance_depts = FinanceDept.all
    render json: @finance_depts
  end

  # GET /divisions/1
  # GET /divisions/1.json
  def show
  	if params[:division_id]
  		@finance_dept = FinanceDept.find_by(:division_id => params[:division_id])
  		render json: @finance_depts

  	else
  	
  	@finance_dept = FinanceDept.find(params[:id])
  	render json: @finance_depts

  	end
  end

  # GET /divisions/new
  def new
    @finance_dept = FinanceDept.new
  end

  # GET /divisions/1/edit
  def edit
  	@finance_dept = FinanceDept.find(params[:id])
  end

  # POST /divisions
  # POST /divisions.json
  def create
    @finance_dept = FinanceDept.new(finance_dept_params)

    respond_to do |format|
      if @finance_dept.save
        format.html { redirect_to @finance_dept, notice: 'FinanceDept was successfully created.' }
        format.json { render :show, status: :created, location: @finance_dept }
      else
        format.html { render :new }
        format.json { render json: @finance_dept.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /divisions/1
  # PATCH/PUT /divisions/1.json
  def update
  	@finance_dept = FinanceDept.find(params[:id])
    respond_to do |format|
      if @finance_dept.update(finance_dept_params)
        format.html { redirect_to @finance_dept, notice: 'FinanceDept was successfully updated.' }
        format.json { render :show, status: :ok, location: @finance_dept }
      else
        format.html { render :edit }
        format.json { render json: @finance_dept.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /divisions/1
  # DELETE /divisions/1.json
  def destroy
  	@finance_dept = FinanceDept.find(params[:id])
    @finance_dept.destroy
    respond_to do |format|
      format.html { redirect_to finance_depts_url, notice: 'FinanceDept was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_finance_dept
      @finance_dept = FinanceDept.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def finance_dept_params
      params.require(:finance_dept).permit(:name, :division_id)
    end
end


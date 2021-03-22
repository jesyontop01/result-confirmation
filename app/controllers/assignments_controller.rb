class AssignmentsController < ApplicationController
  before_action :authenticate_user!
  # before_action :set_assignment, only: [:show, :edit, :update, :destroy]
load_and_authorize_resource :except => :user_permissions
  # GET /assignments
  # GET /assignments.json
  def index

      sql = <<-SQL 
  
          SELECT  a.[id] ,a.[user_id] ,b.name
        FROM [verifierApp].[dbo].[assignments] as a
        inner join roles as b
        on a.role_id = b.id

        SQL

            @assignments = ActiveRecord::Base.connection.exec_query(sql)

   
    #@assignments = Assignment.all
    render json: @assignments
  end

  # GET /assignments/1
  # GET /assignments/1.json
  def show
     @assignment = Assignment.find(params[:id])
  end

  # GET /assignments/new
  def new
    @assignment = Assignment.new
  end

  # GET /assignments/1/edit
  def edit
     @assignment = Assignment.find(params[:id])
  end

  # POST /assignments
  # POST /assignments.json
  def create
    @assignment = Assignment.new(assignment_params)

    respond_to do |format|
      if @assignment.save
        format.html { redirect_to @assignment, notice: 'Assignment was successfully created.' }
        format.json { render :show, status: :created, location: @assignment }
      else
        format.html { render :new }
        format.json { render json: @assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /assignments/1
  # PATCH/PUT /assignments/1.json
  def update
     @assignment = Assignment.find(params[:id])
    respond_to do |format|
      if @assignment.update(assignment_params)
        format.html { redirect_to @assignment, notice: 'Assignment was successfully updated.' }
        format.json { render :show, status: :ok, location: @assignment }
      else
        format.html { render :edit }
        format.json { render json: @assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /assignments/1
  # DELETE /assignments/1.json
  def destroy
     @assignment = Assignment.find(params[:id])
    @assignment.destroy
    respond_to do |format|
      format.html { redirect_to assignments_url, notice: 'Assignment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def user_permissions

       params[:user_id] = current_user.id

            # sql = <<-SQL 
      
            #   SELECT 
            #        b.name
            # FROM [verifierApp].[dbo].[assignments] as a
            # inner join roles as b
            # on a.role_id = b.id
            # where a.[user_id] =  '#{params[:user_id]}'

            # SQL

            #     @assignments = ActiveRecord::Base.connection.exec_query(sql)
    @assignments = current_user.role.name       
        #@assignments = Assignment.all
        render json: @assignments
  end


  private

    # Use callbacks to share common setup or constraints between actions.
    def set_assignment
      # @assignment = Assignment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def assignment_params
      params.require(:assignment).permit(:user_id, :role_id)
    end
end

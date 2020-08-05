class PaymentSearchController < ApplicationController
  def index
  	params[:office_id] = current_user.office_id

        if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

            @year = Year.find_by(:YearName => params[:YearName])
            params[:year_id] = @year.id

            @diet = Diet.find_by(:DietName => params[:DietName])
            params[:diet_id] = @diet.id



             sql = <<-SQL 

          SELECT  
          a.[id], b.[DietName], c.[YearName], a.[exam_no], a.[cand_email], a.[created_at], d.[office_name], a.[receipt_no]
          FROM [verifierApp].[dbo].[payments] a
          inner join [verifierApp].[dbo].[Diets] b
          on a.diet_id = b.id
          inner join [verifierApp].[dbo].[Years] c
          on a.year_id = c.id
          inner join [verifierApp].[dbo].[offices] d
          on a.office_id = d.id
           where year_id = '#{params[:year_id]}' and diet_id = '#{params[:diet_id]}'  and exam_no='#{params[:CandNo]}'

        SQL
      
  


                # sql = <<-SQL 
          
                #   SELECT 
                #       *
                #   FROM [verifierApp].[dbo].[payments]
                #   where yearId = '#{params[:yearId]}' and dietId = '#{params[:dietId]}'  and CandNo='#{params[:CandNo]}'

                # SQL

                    @test_results = ActiveRecord::Base.connection.exec_query(sql)
          end 
      respond_to do |format|
      format.html {}
      format.json { render json: @test_results }
    end
  end

  def show
  end
end

class YearsController < ApplicationController
  before_action :authenticate_user!
  def index
		@years = Year.all
		respond_to do |format|
	
		format.json { render json: @years }
		end
	end

	def show
        if params[:id].present? 
         
         # Selecting the Requested result row and picking column TABLE_ID................
        
          @examYear = Year.find_by(:id => params[:id]) 
         #@idDiet = @exam.id
        else
          @examYear = []
        end
            respond_to do |format|
            
              format.json { render json: @examYear}
        end
  end
end

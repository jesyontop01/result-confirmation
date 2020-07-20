class DietsController < ApplicationController
  before_action :authenticate_user!
	def index
		@diets = Diet.all
		respond_to do |format|
	
		format.json { render json: @diets }
		end
	end

	def show
        if params[:id].present? 
         
         # Selecting the Requested result row and picking column TABLE_ID................
        
          @examDiet = Diet.find_by(:id => params[:id]) 
         #@idDiet = @exam.id
        else
          @result = []
        end
            respond_to do |format|
              
              format.json { render json: @examDiet}
        end
  end
end

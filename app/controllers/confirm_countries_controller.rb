class ConfirmCountriesController < ApplicationController
	before_action :authenticate_user!
  def index
	    if params[:confirm_type_id].present?
	 	     @confirmCountry = ConfirmCountry.where(:confirm_type_id => params[:confirm_type_id]).all
	 	 
	 	 else

			@confirmCountry = ConfirmCountry.all
			
		end
			 respond_to do |format|
			 format.html {}
			 format.json { render json: @confirmCountry }
			 end
  
  end

  def show

  end

  def create

  end

end

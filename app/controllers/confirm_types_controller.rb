class ConfirmTypesController < ApplicationController
	before_action :authenticate_user!
  def index
	  @confirmTypes = ConfirmType.all
		 respond_to do |format|
		 format.html {}
		 format.json { render json: @confirmTypes }
		 end
  end

  
end

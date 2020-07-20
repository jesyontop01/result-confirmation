class OfficesController < ApplicationController
	#before_action :authenticate_user!
  def index
  	@offices= Office.all

  	render json: @offices
  end
end

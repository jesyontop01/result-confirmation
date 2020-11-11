class OfficesController < ApplicationController
	#before_action :authenticate_user!
  def index
  	@offices= Office.all.order(office_name: :asc)

  	render json: @offices
  end
end

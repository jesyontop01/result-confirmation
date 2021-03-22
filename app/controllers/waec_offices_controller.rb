class WaecOfficesController < ApplicationController
  def index
  	@states = WaecOffice.all

  	render json: @states
  end
end

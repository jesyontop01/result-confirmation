class MainOfficesController < ApplicationController
  def index
     @offices= Office.all.order(office_name: :asc)

     render json: @offices
  end
end

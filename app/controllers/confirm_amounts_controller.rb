class ConfirmAmountsController < ApplicationController
  def index

  	if params[:confirm_type_id]
  		@confirm_amount = ConfirmAmount.find_by(:confirm_type_id => params[:confirm_type_id])
  		render json: @confirm_amount

  	else
  	
  	@confirm_amounts = ConfirmAmount.all
  	render json: @confirm_amounts

  	end
  end

  def show
  	@confirm_amount = ConfirmAmount.find_by(:confirm_type_id)
  	render json: @confirm_amount
  end
end

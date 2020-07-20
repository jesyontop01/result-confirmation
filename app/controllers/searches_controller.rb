class SearchesController < ApplicationController
	before_action :authenticate_user!
	def new
		@search = Search.new
	end

	def create
		@search = Search.create(search_params)
		redirect_to search
	end

	def show
		@search = Search.find(params[:id])
	end


	private
	def search_params
		params.require(:search).permit(:keywords, :office_id, :confirm_type_id, :year, :month)
	end
end

class SearchesController < ApplicationController
	before_action :authenticate_user!

	def index

		  if params[:CandName].present? && params[:yearId].present? && params[:dietId].present?

            @results = Search.getDataByCandName(params[:CandName], params[:yearId], params[:dietId])
                   
      else
              #@results = WassceD2008.take(10)
              @results =  []
      end

#     @page = (params[:page] || 0).to_i


#       if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

#           @year = Year.find_by(:YearName => params[:YearName])
#           params[:yearId] = @year.id

#           @diet = Diet.find_by(:DietName => params[:DietName])
#           params[:dietId] = @diet.id
      
  

#           if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?
# #binding.pry
#           #   response = Faraday.get do |req|
#           #   req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
#           #   req.params['CandNo'] = '#{params[:CandNo]}'
#           #   req.params['yearId'] = '#{params[:yearId]}'
#           #   req.params['dietId'] = '#{params[:dietId]}'
#           #   req.headers['Content-Type'] = 'application/json'
#           # end
#           # @results = response.body
#           @results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
                 
#           else
#             #@results = WassceD2008.take(10)
#             @results = []
#           end

#       end
     
  		

          # if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

          #   @results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
                   
          #   else
          #   	#@results = WassceD2008.take(10)
          #   	@results =  []
          #   end

          if @results.present?


          @certToken = Exam.getToken()
          @Token = @certToken["access_token"]

            if @Token.present?
               params[:YearName] = Year.find_by(:id => params[:yearId] ).YearName
              #@status = Exam.getResultStatus(params[:CandNo], params[:YearName],  @Token )
                        response = Faraday.get do |req|
                        req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateStatus?"
                        req.params['ExamYear'] = params[:YearName]
                        req.params['CandidateNo'] = params[:CandNo]
                        req.headers['Authorization'] = 'Bearer ' +  @Token
                        #req.headers['Content-Type'] = 'application/json'
                      end

                   @status = JSON.parse(response.body)
            end

          #binding.pry
            @certToken
          end


            respond_to do |format|
        		format.html {}
        		format.json { render json: {results: @results, status: @status} }
      		end



	end
	
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

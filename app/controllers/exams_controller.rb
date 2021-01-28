class ExamsController < ApplicationController

  before_action :authenticate_user!
 #before_action :set_table_name, only: [:show]
 #include HTTParty
 load_and_authorize_resource

  PAGE_SIZE = 10
  
  def index

    @page = (params[:page] || 0).to_i


      if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

          @year = Year.find_by(:YearName => params[:YearName])
          params[:yearId] = @year.id

          @diet = Diet.find_by(:DietName => params[:DietName])
          params[:dietId] = @diet.id
      
  

          if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?
#binding.pry
            response = Faraday.get do |req|
            req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
            req.params['CandNo'] = '#{params[:CandNo]}'
            req.params['yearId'] = '#{params[:yearId]}'
            req.params['dietId'] = '#{params[:dietId]}'
            req.headers['Content-Type'] = 'application/json'
          end
          @results = response.body
                 
          else
            #@results = WassceD2008.take(10)
            @results = []
          end

      end
     
  		

          if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

              response = Faraday.get do |req|
              req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
              req.params['CandNo'] = params[:CandNo]
              req.params['yearId'] = params[:yearId]
              req.params['dietId'] = params[:dietId]
              req.headers['Content-Type'] = 'application/json'

            end
            @results = response.body
                   
            else
            	#@results = WassceD2008.take(10)
            	@results =  []
            end


            respond_to do |format|
        		format.html {}
        		format.json { render json: @results }
      		end

  end

  def new
  end

  def edit
  end


  def confirmations
    
    #@confirms1 = Confirmation.all.order("created_at DESC")
    @confirms = Confirmation.where(:office_id => current_user.office_id).order("created_at DESC")
    #@confirms = Confirmation.where(:ref_no[0,11] => current_user.office_id).order("created_at DESC")
     # respond_to do |format|
          
   #        format.json { render json: @confirms }
   #      end
    render json: @confirms
  end

  

  def show

    if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

      @year = Year.find_by(:YearName => params[:YearName])
      params[:yearId] = @year.id

      @diet = Diet.find_by(:DietName => params[:DietName])
      params[:dietId] = @diet.id
      
  

          if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

            response = Faraday.get do |req|
            req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
            req.params['CandNo'] = params[:CandNo]
            req.params['yearId'] = params[:yearId]
            req.params['dietId'] = params[:dietId]
            req.headers['Content-Type'] = 'application/json'
          end
          @results = response.body
                 
          else
            #@results = WassceD2008.take(10)
            @result = []
          end
          respond_to do |format|
          format.html {}
          format.json { render json: @result }
          end

      end


      if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

            response = Faraday.get do |req|
            req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
            req.params['CandNo'] = params[:CandNo]
            req.params['yearId'] = params[:yearId]
            req.params['dietId'] = params[:dietId]
            req.headers['Content-Type'] = 'application/json'
          end
          @results = response.body
                 
          else
            #@results = WassceD2008.take(10)
            @result = []
          end
          respond_to do |format|
          format.html {}
          format.json { render json: @result }
          end

  end
  

  private

  	def exam_params
  		params.require(:exam).permit(:exam_name,:exam_diet,:table_name,:model_name)
  	end

  

 

end


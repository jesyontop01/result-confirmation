class Search < ActiveRecord::Base
  belongs_to :diet
  belongs_to :office
  belongs_to :confirm_type

      def self.getDataByCandName(candName, yearId, dietId)
      response = Faraday.get do |req|
              req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
              req.params['candName'] = "#{candName}" #params[:CandNo]
              req.params['yearId'] =  "#{yearId}"#params[:yearId]
              req.params['dietId'] = "#{dietId}"#params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'

            end
            JSON.parse(response.body)
     end

end

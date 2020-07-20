require 'rubygems'
require 'httparty'
# Use the class methods to get down to business quickly
#response = HTTParty.get('http://api.stackexchange.com/2.2/questions?site=stackoverflow')
#response = HTTParty.get('http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?CandNo=4250101002&yearId=1&dietId=1')
#puts response.body, response.code, response.message, response.headers.inspect

# Or wrap things up in your own class
class ResultApi
  include HTTParty
  base_uri '172.21.13.44/WaecMobileApi'
  format :json
  
  def initialize(candNo, yearId, dietId)
    @options = { query: { CandNo: candNo, yearId: yearId, dietId: dietId } }
  end

  def questions
    self.class.get('/api/WaecMobile/GetResultForConfirmation', @options)
  end

  
end

result = ResultApi.new(4250101012, 1, 1 )
puts result.questions

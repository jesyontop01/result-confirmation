class Exam < ActiveRecord::Base

  #https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateDetailStatus?CandidateNo=5010101001&ExamYear=2020
     

    def self.getData(candNo, examYear)
      response = Faraday.get do |req|
              req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateDetailStatus?"
              req.params['CandidateNo'] = "#{candNo}" 
              req.params['ExamYear'] =  "#{examYear}"
              req.headers['Content-Type'] = 'application/JSON'

            end
            JSON.parse(response.body)
     end

    # def self.getData(candNo, yearId, dietId)
  		# response = Faraday.get do |req|
    #           req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
    #           req.params['CandNo'] = "#{candNo}" #params[:CandNo]
    #           req.params['yearId'] =  "#{yearId}"#params[:yearId]
    #           req.params['dietId'] = "#{dietId}"#params[:dietId]
    #           req.headers['Content-Type'] = 'application/JSON'

    #         end
    #         JSON.parse(response.body)
    #  end

## Get Searched Candidate
#http://172.21.13.25/resultapi/result/ResultByCandNo?candNo=5010101003&examYear=2020&examType=2

    def self.getSearchedCandidate(candNo, examYear, dietId)
      response = Faraday.get do |req|
              req.url "http://172.21.13.25:82/result/ResultByCandNo?"
              req.params['CandNo'] = "#{candNo}" #params[:CandNo]
              req.params['examYear'] =  "#{examYear}"#params[:yearId]
              req.params['examType'] = "#{dietId}"#params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'

            end
            JSON.parse(response.body)
        end


        def self.getSearchedResults(candNo, examYear, dietId)
      response = Faraday.get do |req|
              req.url "http://172.21.13.25:82/result/Candidate_No?"
              req.params['CandNo'] = "#{candNo}" #params[:CandNo]
              req.params['examYear'] =  "#{examYear}"#params[:yearId]
              req.params['examType'] = "#{dietId}"#params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'

            end
            JSON.parse(response.body)
        end

#candName=john&examYear=2020&examType=2
    def self.getDataByCandName(candName, year, dietId)
          response = Faraday.get do |req|
              req.url "http://172.21.13.25:82/result/Candidate_Name?"
              req.params['candName'] = "#{candName}"
              req.params['examYear'] =  "#{year}"
              req.params['examType'] =  "#{dietId}"
              req.headers['Content-Type'] = 'application/JSON'
            end
            #response.body
            JSON.parse(response.body)
     end


	def self.getToken()
      response = Faraday.new(url: "https://ictdapps.waec.org.ng")
                        .post('/WaecCert/Token', {username: 'confirmation@waec.org.ng', 
                                                  password: 'confirm@2021',
                                                  grant_type: 'password' })
    JSON.parse(response.body)
    end

    def self.getResultStatus(candNo, yearName,  token )
    	    response = Faraday.get do |req|
            req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateStatus?"
            req.params['CandidateNo'] = '#{candNo}'
            req.params['ExamYear'] = '{yearName}'
            req.headers['Authorization'] = 'Bearer ' + token
            #req.headers['Content-Type'] = 'application/json'
          end

         JSON.parse(response.body)
    end

    ##Returns Complete Result From Certificate server.

    def self.getCompleteResultStatus(candNo, yearName)
          response = Faraday.get do |req|
            req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateDetailStatus?"
            req.params['CandidateNo'] = "#{candNo}"
            req.params['ExamYear'] = "#{yearName}"
            #req.headers['Content-Type'] = 'application/json'
          end

         JSON.parse(response.body)
    end


end

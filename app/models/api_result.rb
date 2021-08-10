class ApiResult < ActiveRecord::Base


	def self.getData(candNo, yearId, dietId)
  		response = Faraday.get do |req|
              req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
              req.params['CandNo'] = "#{candNo}" #params[:CandNo]
              req.params['yearId'] =  "#{yearId}"#params[:yearId]
              req.params['dietId'] = "#{dietId}"#params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'

            end
            JSON.parse(response.body)
     end

#http://172.21.13.25/resultapi/result/ResultByCandNo?candNo=5010101003&examYear=2020&examType=2

		def self.getSearchedCandidate(candNo, examYear, dietId)
  		response = Faraday.get do |req|
              req.url "http://172.21.13.25/resultapi/result/ResultByCandNo?"
              req.params['CandNo'] = "#{candNo}" #params[:CandNo]
              req.params['examYear'] =  "#{examYear}"#params[:yearId]
              req.params['examType'] = "#{dietId}"#params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'

            end
            JSON.parse(response.body)
        end


        def self.getDetailedResults(candNo, examYear, dietId)
  		 response = Faraday.get do |req|
              req.url "http://172.21.13.25/resultapi/result/Candidate_No?"
              req.params['candNo'] = "#{candNo}" #params[:CandNo]
              req.params['examYear'] =  "#{examYear}"#params[:yearId]
              req.params['examType'] = "#{dietId}"#params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'

            end
            JSON.parse(response.body)
        end


    def self.getDataByCandName(candName, examYear, dietId)
          response = Faraday.get do |req|
              req.url "http://172.21.13.25/resultapi/result/Candidate_Name?"
              req.params['candName'] = params[:candName]
              req.params['yearId'] =  params[:yearId]
              req.params['dietId'] = params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'
            end
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

    
    ## Returns Candidate's Picture from certificate API 
    def self.getCertificateStatusPicture(candNo, yearName)
          response = Faraday.get do |req|
            req.url "https://ictdapps.waec.org.ng/WaecCertConfirmation/Services/GetCertificateStatusPicture?"
            req.params['CandidateNo'] = "#{candNo}"
            req.params['ExamYear'] = "#{yearName}"
            #req.headers['Content-Type'] = 'application/json'
          end

         JSON.parse(response.body)
    end
    ## Returns Candidate's Picture from certificate API 
    def self.getCertificateStatusWithReason(candNo, yearName)
          response = Faraday.get do |req|
            req.url "https://ictdapps.waec.org.ng/WaecCertConfirmation/Services/GetCertificateStatusWithReason?"
            req.params['CandidateNo'] = "#{candNo}"
            req.params['ExamYear'] = "#{yearName}"
            #req.headers['Content-Type'] = 'application/json'
          end

         JSON.parse(response.body)
    end

    ## Returns Complete result for confirmation certificate Enquiry

    def self.getResultStatuses(candNo, yearName)
          response = Faraday.get do |req|
            req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateDetailStatus?"
            req.params['CandidateNo'] = "#{candNo}"
            req.params['ExamYear'] = "#{yearName}"
            #req.headers['Content-Type'] = 'application/json'
          end

         JSON.parse(response.body)
    end


end


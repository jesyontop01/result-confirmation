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

    def self.getSearchedCandidate(candNo, yearName,  token )
      response = Faraday.get do |req|
        req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateDetails?"
        req.params['CandidateNo'] = "#{candNo}"
        req.params['ExamYear'] = "#{yearName}"
        req.headers['Authorization'] = 'Bearer ' + token
        #req.headers['Content-Type'] = 'application/json'
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
            # req.headers['Content-Type'] = 'application/json; charset=utf-8'
          end

         JSON.parse(response.body)
    end

    def self.connectToApi()

      conn = Faraday.new('https://euploads.wes.org/api/v2') do |f|
        f.request :json # encode req bodies as JSON and automatically set the Content-Type header
        f.request :retry # retry transient failures
        f.response :json # decode response bodies as JSON
        f.adapter :net_http # adds the adapter to the connection, defaults to `Faraday.default_adapter`
      end

      # conn = Faraday.new(
      #   url: "https://testeuploads.wes.org/api/v2",
      #   #params: {param: '1'},
      #   headers: {'Content-Type' => 'application/json'})

      response = conn.post('/authenticate') do |req|
        ##req.params['limit'] = 100
        req.headers['Content-Type'] = 'application/json'
        req.body = {username: 'WAECNGA', password: '0zHL5dRUIk5w'}.to_json
      end
      
      # response = conn.post('/authenticate/') do |req|
      #   #req.params['limit'] = 100
      #   req.body = { username: 'WAECNGA', password: '2rDYxvSh6VW2'}.to_json
      # end
      #binding.pry
      JSON.parse(response.body)

    end

    def self.connectToWES()
      response = Faraday.new(url: 'https://euploads.wes.org/api/v2').post('/authenticate/', {username: 'WAECNGA', password: '0zHL5dRUIk5w'}.to_json, {'Content-Type'=>'application/json'})
      # response = Faraday.new(url: "https://testeuploads.wes.org/api/v2")
      #                   .post('/authenticate/', {
      #                                             username: "WAECNGA", 
      #                                             password: "2rDYxvSh6VW2"
      #                                         }.to_json, as: :json
      #                                       )
    #binding.pry
    JSON.parse(response.body)
    end

    def self.wesConnection()

      credential =  {
                 "username": "WAECNGA", 
                 "password": "0zHL5dRUIk5w"
              }

      headers = {
        "Content-Type" => "application/json",
        #'authorization'=> 'bearer ' + api_key
      }
      
      response = HTTParty.post("https://euploads.wes.org/api/v2/authenticate/", 
      :headers => headers,
      :body => credential.to_json)
      
      #binding.pry
      JSON.parse(response.body)
    end

    def self.getWESApplicantInfo(url, refNumber,  token )

      #binding.pry 
      headers = {
        "Content-Type" => "application/json",
        'authorization'=> 'bearer ' + token
      }
      
      response = HTTParty.get("https://euploads.wes.org/api/v2//applicantinfo/"+refNumber, 
      :headers => headers
    )

      #binding.pry
     JSON.parse(response.body)
  end

  def self.pastFile(url, refNumber,  token, file, filetype )
      url = "https://euploads.wes.org/api/v2/file/"+refNumber+"/"+filetype
      options = {
        headers: {
          'Authorization' => " Bearer #{token}",
          'Accept'        => 'application/json'
        },
        body: {
          file: File.open(file)
        },
        format: :plain
      }
      j = HTTParty.post(url, options)

      s = 
        begin
          JSON.parse(j.body)
        rescue JSON::ParserError => e
          raise "POST request failed: #{j.body}"
        end

      pp s
  end

  ##/file/{refnumber}/{filetype}
  def self.sendFileConfirmationToClient(url, refNumber,  token, file,filetype )

    credential =  {
      "file": "WAECNGA"
   }

    headers = {
      "Content-Type" => "application/pdf",
      'authorization'=> 'bearer ' + token
    }
    
    
    response = HTTParty.post("https://euploads.wes.org/api/v2/file/"+refNumber+"/pdf", 
    :headers => headers,
    :body => credential.to_json
  )

    #binding.pry
   JSON.parse(response.body)
end

      def self.sendBase64ConfirmationToClient(url, refNumber,  token , content, title, filesize)


        credential =  {
            "clientUploadId": " ",
            "files": [
              {
                "title": title,
                "size": filesize,
                "content": content,
              }
            ]
        }

        headers = {
          "Content-Type" => "application/json",
          'authorization'=> 'bearer ' + token
        }
        
        #binding.pry
        
        response = HTTParty.post("https://euploads.wes.org/api/v2/file/base64/#{refNumber}", 
        :headers => headers,
        :body => credential.to_json
      )

        ##binding.pry
      #JSON.parse(response)
      #response.body
      response
    end

    def self.sendJSON_ConfirmationToClient(url, refNumber,  token , content, title, filetype)


      credential =  {

              "fileName": title,
              "content": content,      }

      headers = {
        "Content-Type" => "application/json",
        'authorization'=> 'bearer ' + token
      }
      
      #binding.pry 'https://testeuploads.wes.org/api/v2/file/23456778/json'
      # https://euploads.wes.org/api/v2/file
      
      response = HTTParty.post("#{refNumber}/#{refNumber}/json", 
      :headers => headers,
      :body => credential.to_json
    )

      ##binding.pry
    #JSON.parse(response)
    #response.body
    response
  end


end

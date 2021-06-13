module ApplicationHelper

  def getCertStatus
    require 'uri'

    password_text = "confirm@@2021"
params[:password_text] = URI.escape(password_text)
            params[:YearName] = Year.find_by(:id => params[:yearId])

            response = Faraday.get do |req|
            req.url "https://ictdapps.waec.org.ng/WaecCert/Token?"
            req.params['username'] = 'confirmation@waec.org.ng'
            req.params['password'] = '#{params[:password_text]}'
            req.headers['Content-Type'] = 'application/json'
          end
       return   @certToken = response.body
          return   @certToken


          #   params[:YearName] = Year.find_by(:id => params[:yearId])

          #   response = Faraday.get do |req|
          #   req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateStatus?"
          #   req.params['CandidateNo'] = '#{params[:CandNo]}'
          #   req.params['ExamYear'] = '#{params[:YearName]}'
          #   req.headers['Content-Type'] = 'application/json'
          # end
          # @certToken = response.body
          # binding.pry
  end
  
end

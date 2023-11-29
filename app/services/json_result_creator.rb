class JsonResultCreator
    def initialize(resultsArray, confirmation, diet)
       @resultsArray = resultsArray 
       @confirmation = confirmation
       @diet = diet
    end

    def call
        subjectsGrade = []

        @resultsArray.each do |result|
            resultComponent = {
              "subject": result[:Subject],
              "grade": result[:Grade],
              "intrepretation": result[:GradeInter]
            }
    
            subjectsGrade << resultComponent
            
           end

           #@confirmation = Confirmation.find(params[:confirmID])
    
           @candidateType = @diet[0]["exam_type_code"] =='j'? 'School Candidate' : 'Private Candidate'

            #issuedDate = Date.parse(DateTime.current).strftime("%B %e, %Y") # DateTime.current.strptime("%d/%m/%Y")
            issuedDate = ActiveSupport::TimeZone["Central Time (US & Canada)"].parse(DateTime.current.to_s).utc.to_date.strftime("%d/%m/%Y")
         
            #binding.pry
            
           confirmResult_Json = {
             "WAECRefNumber": @confirmation.ref_no,
             "WesRefNumber": @confirmation.WES_Ref,        
             "examName":   @resultsArray[0][:examType],
             "examYear": @resultsArray[0][:examYear].to_s,
             "candidateNumber": @confirmation.exam_no,
             "candidateType": @candidateType,
             "candidateName": @resultsArray[0][:candName],
             "sex": @resultsArray[0][:sex],
             "dateOfBirth": @resultsArray[0][:dob2],
             "noOfSubjects": @resultsArray.length.to_s,
             "issuedate": issuedDate, #"17/03/2023",
             "country": "Nigeria",
             "subjectsData": subjectsGrade
           }
    end
end
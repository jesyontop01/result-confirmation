class ExamsController < ApplicationController
  include ApplicationHelper


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
          #   response = Faraday.get do |req|
          #   req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
          #   req.params['CandNo'] = '#{params[:CandNo]}'
          #   req.params['yearId'] = '#{params[:yearId]}'
          #   req.params['dietId'] = '#{params[:dietId]}'
          #   req.headers['Content-Type'] = 'application/json'
          # end
          # @results = response.body
          @results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
          # @results = Exam.getSearchedResults(params[:CandNo], params[:examYear], , params[:dietId])
          # @results = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], , params[:dietId])
           
                 
          else
            #@results = WassceD2008.take(10)
            @results = []
          end

      end
     
  		

      if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

            @results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
                   
      else
            	#@results = WassceD2008.take(10)
            	@results =  []
      end


       respond_to do |format|

        if @results.present?


          #     @certToken = Exam.getToken()
          #     @Token = @certToken["access_token"]

          #     if @Token.present?
          #        params[:YearName] = Year.find_by(:id => params[:yearId] ).YearName
          #       #@status = Exam.getResultStatus(params[:CandNo], params[:YearName],  @Token )
          #                 response = Faraday.get do |req|
          #                 req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateStatus?"
          #                 req.params['ExamYear'] = params[:YearName]
          #                 req.params['CandidateNo'] = params[:CandNo]
          #                 req.headers['Authorization'] = 'Bearer ' +  @Token
          #                 #req.headers['Content-Type'] = 'application/json'
          #               end

          #            @status = JSON.parse(response.body)
          #     end

          # #binding.pry
          #   @certToken

            format.html {}
            format.json { render json: {success: true, results: @results} }
          else
            format.html { render :new }
            format.json { render json: {success: false, message: "Candidate's Result is not available" }}
          end
          
      end


        #     respond_to do |format|
        # 		format.html {}
        # 		format.json { render json: {results: @results, status: @status} }
      		# end

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

  def getResultByCandidate

    if params[:candName].present? && params[:examYear].present? && params[:dietId].present?
            
            @results = Exam.getDataByCandName(params[:candName], params[:examYear], params[:dietId])
         
    else
            @results = []
    end

         respond_to do |format|
          if @results == []
            
              format.html { render :new }
            format.json { render json: {success: false, message: "Candidate's Result is not available" }}
          
          else
              format.html {}
            format.json { render json: {success: true, results: @results} }
          
          end
        end

  
  
  end


  def getResultStatus
      
       subjectindex = {
        "101"=>"ENGLISHLANG",
        "103"=>"COMMERCE",
        "104"=>"FIN. ACCOUNTING",
        "106"=>"SHORTHAND",
        "107"=>"TYPEWRITING",
        "108"=>"AUTO PSM/DISING",
        "109"=>"BOOK KEEPING",
        "110"=>"DATA PROCESSING",
        "111"=>"INSURANCE",
        "112"=>"MARKETING",
        "113"=>"OFFICE PRACTICE",
        "114"=>"SALESMANSHIP",
        "116"=>"STORE KEEPING",
        "117"=>"STORE M/GEMENT",
        "201"=>"XTIAN-REL-KNOWL",        
        "202"=>"CR/STUDIES",
        "203"=>"ECONOMICS",
        "204"=>"GEOGRAPHY",
        "205"=>"GOVERNMENT",
        "207"=>"HISTORY",
        "208"=>"ISLAMIC STUDIES",
        "210"=>"LIT-IN-ENGLISH",
        #"211"=>"HAUSA LIT",
        "211"=>"LITINENG",        
        "212"=>"IGBO LIT",
        "213"=>"YORUBA LIT",
        "216"=>"CIVIC EDUCATION",
        "217"=>"TOURISM",
        "221"=>"RELKNOWLEDGE",
        "231"=>"ISLAMIC",
        "241"=>"HISTORY",
        "251"=>"GEOG",
        "261"=>"GOVERNMENT",
        "271"=>"ECONOMICS",
        "311"=>"MATHEMATICS",
        "312"=>"GERMAN",
        "321"=>"STATS",        
        "301"=>"ARABIC",
        "302"=>"ENGLISH LANG",
        "304"=>"FRENCH",
        "327"=>"HAUSA LANGUAGE",
        "175"=>"HAUSA LANGUAGE",
        #"311"=>"MATHEMATICS",
        #"321"=>"STATS",
        "328"=>"IGBO LANGUAGE",
        "329"=>"YORUBA LANGUAGE",
        "330"=>"EDO",
        "331"=>"EFIK",
        "165"=>"HAUSA LANG",
        "332"=>"IBIBIO",
        "401"=>"FURTHER MATHS",
        "402"=>"MATHEMATICS",
        "441"=>"CHEMISTRY",
        "451"=>"BIOLOGY",
        "461"=>"AGRICSCIENCE",
        "471"=>"HEALTHSCIENCE",
        "502"=>"AGRIC SCIENCE",
        "504"=>"BIOLOGY",
        "505"=>"CHEMISTRY",
        "508"=>"HEALTH SCIENCE", 
        "511"=>"PHYSICAL-EDUC",
        "512"=>"PHYSICS",
        "518"=>"ANIMAL H/BANDRY",
        "519"=>"FISHERIES",
        "520"=>"HEALTHEDUCATION",
        "602"=>"APPLIED ELECT-B",
        "603"=>"AUTO MECHANICS",
        "604"=>"BUILDING CONSTR",
        "605"=>"ELECTRONICS",        
        "607"=>"METALWORK",
        "608"=>"TECHNICAL DRG",
        "609"=>"WOODWORK",
        "610"=>"AIR-CON/REFRIG",
        "611"=>"AUTOBODY & PT",
        "612"=>"AUTO ELECT WORK",
        "613"=>"AUTO MECH WORK",
        "614"=>"BASIC ELECTRIC",
        "615"=>"BASIC ELECTRON",
        "616"=>"BL,BRI LAY&CONC",
        "617"=>"CARP & JOINERY",
        "618"=>"COMPUT STUDIES",
        "619"=>"ELECT INS&MWRKS",
        "620"=>"FURNITURE MAKNG",
        "621"=>"GSM M & REPAIR",
        "624"=>"M/C WOODWORKING",
        "625"=>"MINING",
        "626"=>"P&PIPE FITTING",
        "627"=>"PRI CRAFT PRACT",
        "628"=>"RA TV& EL. WORK",
        "629"=>"UPHOLSTERY",
        "630"=>"WELDFENG",
        "701"=>"CLOTH & TEXTILE",
        "702"=>"FOODS & NUTR",
        "703"=>"HOME MANAGEMENT",
        "705"=>"MUSIC",
        "706"=>"VISUAL ART",
        "716"=>"CATE CRAFT PRAC",
        "717"=>"COSMETOLOGY",
        "718"=>"DYE & BLEACHING",
        "719"=>"GARMENT M",
        "720"=>"LEATHER&REPAIRS",
        "711"=>"COMMERCE",
        "721"=>"ACCOUNTS",
        #"721"=>"PAINTING & DECO",
        "722"=>"PHOTOGRAPHY",
        # "721" => "PAINTING & DECO"
         
        # "211" =>  "HAUSA LIT"
  }

subjectindex0 = {
    "010"=>"ENGLISH LANG",
    "011"=>"LATIN",
    "013"=>"FRENCH",
    "016"=>"EWE",
    "017"=>"FANTI",
    "018"=>"GA",
    "019"=>"TWI",
    "021"=>"ENGLISH LIT",
    "022"=>"BIBLE KNOWLEDGE",
    "023"=>"ISLMC RK",
    "024"=>"HISTORY",
    "025"=>"GEOGRAPHY",
    "026"=>"GOVT",
    "027"=>"ECONOMICS",
    "031"=>"MODERN MATHEMATICS",    
    "032"=>"MATHEMATICS B COMMERCIAL", 
    "033"=>"ADDITIONAL MATHEMATICS",    
    "034"=>"ADDITIONAL MODERN MATHEMATICS", 
    "035"=>"STATISTICS", 
    "037"=>"GENERAL MATHEMATICS",
    "038"=>"MATHEMATICS B TECHNICAL", 
    "041"=>"GEN SCI",
    "042"=>"ADD GSC",
    "043"=>"PHYSICS",
    "044"=>"CHEMIST",
    "045"=>"BIOLOGY",
    "046"=>"AGRIC SC",
    "047"=>"HEALTH SCIENCE",
    "051"=>"ART",
    "055"=>"CL & TXL",
  "056"=>"FOOD&NUT",
  "057"=>"HOME MGT",
  "061"=>"TECH DR",
  "062"=>"ELCTRCTY",
  "063"=>"ELCTRNCS",
  "064"=>"METALWK",
  "065"=>"WOODWORK",
  "066"=>"SURVEYNG",
  "067"=>"ENG WKSP",
  "068"=>"AUTO MCS",
  "071"=>"COMMERCE",
  "072"=>"ACCOUNTS",
  "074"=>"SHORT HD",
  "075"=>"ECON GEO",
  "076"=>"OFF PRAC",
  "077"=>"SECR DUT",
  "078"=>"BUS MTHD",
  "101"=>"ENGLISHLANG",
  "103"=>"ENG ORAL",
  "104"=>"ARABIC",
  "112"=>"ARABIC",
  "114"=>"SHORT HD",
  "116"=>"EFIK",
  "117"=>"HAUSA",
  "118"=>"IGBO",
  "119"=>"YORUBA",
  "122"=>"BIBLE KN",
  "124"=>"HISTORY",        
  "131"=>"FRENCH",
  "143"=>"PHYSICS",
  "144"=>"CHEMIST",
  "145"=>"BIOLOGY", 
  "151"=>"ARABIC",
  "165"=>"HAUSALANG",
  "174"=>"TYPWRTNG",
  "175"=>"HAUSALANG",
  "176"=>"HAUSALIT",
  "185"=>"IGBOLANG",
  "186"=>"IGBOLIT",
  "195"=>"YORUBALANG",
  "196"=>"YORUBALIT",
  "211"=>"LITINENG",
  "212"=>"GREEK",
  "221"=>"RELKNOWLEDGE",
  "224"=>"HISTORY",
  "231"=>"ISLAMIC",
  "241"=>"HISTORY",
  "251"=>"GEOG",
  "261"=>"GOVERNMENT",
  "271"=>"ECONOMICS",
  "311"=>"MATHEMATICS",
  "312"=>"GERMAN",
      "321"=>"STATS",
  "341"=>"FUTHERMATHS",
  "412"=>"ITALIAN",
  "431"=>"PHYSICS",
  "441"=>"CHEMISTRY",
  "451"=>"BIOLOGY",
  "461"=>"AGRICSCIENCE",
  "471"=>"HEALTHSCIENCE",
  "481"=>"PHYSICAEDUC",
  "511"=>"ART",
  "521"=>"MUSIC",
  "551"=>"CLOTH&TEXTILE",
  "561"=>"FOOD&NUTRITION",
  "571"=>"HOMEMANAGE",
  "611"=>"TECHDRAWING",
  "621"=>"BUILDCONST",
  "631"=>"WOODWORK",
  "641"=>"METALWORK",
  "650"=>"MUSIC",
  "651"=>"APPLIEDELEC",
  "661"=>"ELECTRONICS",
  "671"=>"AUTO-MECH",
  "711"=>"COMMERCE",
  "721"=>"ACCOUNTS",  
  "731"=>"SHORTHAND",
  "741"=>"BUS.MGMT.",
  "751"=>"TYPEWRITING",
  "761"=>"BOOK-KEEPING"
  }

  

  gradename = {
        "1"=>"EXCELLENT",
        "2"=>"VERY GOOD",
        "3"=>"GOOD",
        "4"=>"CREDIT",
        "5"=>"CREDIT",
        "6"=>"CREDIT",
        "7"=>"PASS",
        "8"=>"PASS",
        "9"=>"FAIL",
        "X"=>"ABSENT",
        "*"=>"PENDING",
        "$"=>"CANCELLED",
        "H"=>"WITHHELD"
  }
        gradeindex = {
        "1"=>"A1",
        "2"=>"B2",
        "3"=>"B3",
        "4"=>"C4",
        "5"=>"C5",
        "6"=>"C6",
        "7"=>"D7",
        "8"=>"E8",
        "9"=>"F9",
        "X"=>"X",
        "*"=>"*",
        "$"=>"$",
        "H"=>"H"
  }
## Injected from search helper for examination numb.length less than 10 (11032021)
       gradeindex0 = {
        "1"=>"A1",
        "2"=>"A2",
        "3"=>"A3",
        "4"=>"C4",
        "5"=>"C5",
        "6"=>"C6",
        "7"=>"P7",
        "8"=>"P8",
        "9"=>"F9",
        "X"=>"X",
        "*"=>"*",
        "$"=>"$",
        "H"=>"H"
  }

 ordinal = [ "ZERO", "ONE","TWO","THREE", "FOUR","FIVE","SIX", "SEVEN","EIGHT","NINE" ]



if params[:CandidateNo].present? && params[:ExamYear].present?
      
        #@resultVals = Exam.getData(params[:CandidateNo], params[:ExamYear])
         @resultVals = Exam.getCompleteResultStatus(params[:CandidateNo], params[:ExamYear])
# binding.pry
  subjectsContainer = Hash.new
  resultsContainer = Hash.new
  suj = Hash.new
  grd = Hash.new
  grdNam = Hash.new
          #  01234567890123456789012345678901234567890
 ##Results: "20362052302440194026504550545127"

   if @resultVals["CandNo"].present?

               subjectsContainer[0] = @resultVals["Results"][0,3]
               subjectsContainer[1] = @resultVals["Results"][4,3]
               subjectsContainer[2] = @resultVals["Results"][8,3]
               subjectsContainer[3] = @resultVals["Results"][12,3]
               subjectsContainer[4] = @resultVals["Results"][16,3]
               subjectsContainer[5] = @resultVals["Results"][20,3]
               subjectsContainer[6] = @resultVals["Results"][24,3]
               subjectsContainer[7] = @resultVals["Results"][28,3]
               subjectsContainer[8] = @resultVals["Results"][32,3]
               subjectsContainer[9] = @resultVals["Results"][36,3]

               resultsContainer[0] = @resultVals["Results"][3,1]
               resultsContainer[1] = @resultVals["Results"][7,1]
               resultsContainer[2] = @resultVals["Results"][11,1]
               resultsContainer[3] = @resultVals["Results"][15,1]
               resultsContainer[4] = @resultVals["Results"][19,1]
               resultsContainer[5] = @resultVals["Results"][23,1]
               resultsContainer[6] = @resultVals["Results"][27,1]
               resultsContainer[7] = @resultVals["Results"][31,1]
               resultsContainer[8] = @resultVals["Results"][35,1]
               resultsContainer[9] = @resultVals["Results"][39,1]




  resultObjects = Hash.new
  finalResult = []

          # if @entry.form_no.nil?
          #   pix_filename='public/images/pix/'+ @waec_confirmation.waec_exam.pix_folder+'/pict/'+ @entry.exam_no[0..6] +'/' +  @entry.exam_no + '.jpg'
          # else
          #   pix_filename='public/images/pix/'+ @waec_confirmation.waec_exam.pix_folder+'/pict/'+ @entry.exam_no[0..6] +'/' +  @entry.form_no + '.jpg'
            
          # end


          if @resultVals["CandNo"].length == 10


              # @centre = WaecCentre.where("centre_no = ?", @resultVals["CandNo"][0,7])
          @centre = WaecCentre.where(["CentreCode = ? and ExamYear = ?", @resultVals["CandNo"][0,7], params[:ExamYear]])
   
              #centres['centre'] = @centre
              resultObjects['Picture'] = @resultVals["Pix"]
              resultObjects['centre'] = @centre
              resultObjects['candNo'] = @resultVals["CandNo"]
              resultObjects['candName'] = @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"]
              resultObjects['examType'] = @resultVals["examType"]
              resultObjects['examYear'] = params[:ExamYear] #@resultVals["examYear"]
              resultObjects['formNo'] = @resultVals["FormNo"]
              resultObjects['sex'] =  @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE'
              resultObjects['dob'] = @resultVals["DOB"] 
              resultObjects['dob2'] = @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][0,2] +"/"+ @resultVals["DOB"][2,2]+"/"+ @resultVals["DOB"][-4,4] #@results[0]["dob"]
              resultObjects['CentreName'] = @resultVals["CentreName"]
              resultObjects['CertificateStatus'] = @resultVals["CertificateStatus"]
              resultObjects['DatePrinted'] = @resultVals["DatePrinted"]

              resultObjects["Subject1"] = subjectindex[subjectsContainer[0]]
              resultObjects["Subject2"] = subjectindex[subjectsContainer[1]]
              resultObjects["Subject3"] = subjectindex[subjectsContainer[2]]
              resultObjects["Subject4"] = subjectindex[subjectsContainer[3]]
              resultObjects["Subject5"] = subjectindex[subjectsContainer[4]]
              resultObjects["Subject6"] = subjectindex[subjectsContainer[5]]
              resultObjects["Subject7"] = subjectindex[subjectsContainer[6]]
              resultObjects["Subject8"] = subjectindex[subjectsContainer[7]]
              resultObjects["Subject9"] = subjectindex[subjectsContainer[8]]

              ## Interpret All Grades into Hash
              ##

              resultObjects["Grade1"] = gradeindex[resultsContainer[0]]
              resultObjects["Grade2"] = gradeindex[resultsContainer[1]]
              resultObjects["Grade3"] = gradeindex[resultsContainer[2]]
              resultObjects["Grade4"] = gradeindex[resultsContainer[3]]
              resultObjects["Grade5"] = gradeindex[resultsContainer[4]]
              resultObjects["Grade6"] = gradeindex[resultsContainer[5]]
              resultObjects["Grade7"] = gradeindex[resultsContainer[6]]
              resultObjects["Grade8"] = gradeindex[resultsContainer[7]]
              resultObjects["Grade9"] = gradeindex[resultsContainer[8]]

              ## Grade Interpretations


              resultObjects["GradeInter1"] = gradename[resultsContainer[0]]
              resultObjects["GradeInter2"] = gradename[resultsContainer[1]]
              resultObjects["GradeInter3"] = gradename[resultsContainer[2]]
              resultObjects["GradeInter4"] = gradename[resultsContainer[3]]
              resultObjects["GradeInter5"] = gradename[resultsContainer[4]]
              resultObjects["GradeInter6"] = gradename[resultsContainer[5]]
              resultObjects["GradeInter7"] = gradename[resultsContainer[6]]
              resultObjects["GradeInter8"] = gradename[resultsContainer[7]]
              resultObjects["GradeInter9"] = gradename[resultsContainer[8]]

              # finalResult << @resultVals
              finalResult << resultObjects

      else

        ## For Exam Years below 1999 (1998 to 1960's)
                              ## Interpret all subjects

              #grades["Bob"] = 82
              #@centre = WaecCentre.where("centre_no = ?", @resultVals[0]["candNo"][0,5])
            @centre = WaecCentre.where(["CentreCode = ? and ExamYear = ?", @resultVals["CandNo"][0,5], params[:ExamYear]])
   

              resultObjects['Picture'] = @resultVals["Pix"]
              resultObjects['centre'] = @centre
              resultObjects['candNo'] = @resultVals["CandNo"]
              resultObjects['candName'] = @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"]
              resultObjects['examType'] = @resultVals["examType"]
              resultObjects['examYear'] = params[:ExamYear] #@resultVals["examYear"]
              resultObjects['formNo'] = @resultVals["FormNo"]
              resultObjects['sex'] =  @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE'
              resultObjects['dob'] = @resultVals["DOB"] 
              resultObjects['dob2'] = @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][0,2] +"/"+ @resultVals["DOB"][2,2]+"/"+ @resultVals["DOB"][-4,4] #@results[0]["dob"]
              resultObjects['CentreName'] = @resultVals["CentreName"]
              resultObjects['CertificateStatus'] = @resultVals["CertificateStatus"]
              resultObjects['DatePrinted'] = @resultVals["DatePrinted"]

              resultObjects["Subject1"] = subjectindex[subjectsContainer[0]]
              resultObjects["Subject2"] = subjectindex[subjectsContainer[1]]
              resultObjects["Subject3"] = subjectindex[subjectsContainer[2]]
              resultObjects["Subject4"] = subjectindex[subjectsContainer[3]]
              resultObjects["Subject5"] = subjectindex[subjectsContainer[4]]
              resultObjects["Subject6"] = subjectindex[subjectsContainer[5]]
              resultObjects["Subject7"] = subjectindex[subjectsContainer[6]]
              resultObjects["Subject8"] = subjectindex[subjectsContainer[7]]
              resultObjects["Subject9"] = subjectindex[subjectsContainer[8]]

              ## Interpret All Grades into Hash
              ##

              resultObjects["Grade1"] = gradeindex[resultsContainer[0]]
              resultObjects["Grade2"] = gradeindex[resultsContainer[1]]
              resultObjects["Grade3"] = gradeindex[resultsContainer[2]]
              resultObjects["Grade4"] = gradeindex[resultsContainer[3]]
              resultObjects["Grade5"] = gradeindex[resultsContainer[4]]
              resultObjects["Grade6"] = gradeindex[resultsContainer[5]]
              resultObjects["Grade7"] = gradeindex[resultsContainer[6]]
              resultObjects["Grade8"] = gradeindex[resultsContainer[7]]
              resultObjects["Grade9"] = gradeindex[resultsContainer[8]]

              ## Grade Interpretations


              resultObjects["GradeInter1"] = gradename[resultsContainer[0]]
              resultObjects["GradeInter2"] = gradename[resultsContainer[1]]
              resultObjects["GradeInter3"] = gradename[resultsContainer[2]]
              resultObjects["GradeInter4"] = gradename[resultsContainer[3]]
              resultObjects["GradeInter5"] = gradename[resultsContainer[4]]
              resultObjects["GradeInter6"] = gradename[resultsContainer[5]]
              resultObjects["GradeInter7"] = gradename[resultsContainer[6]]
              resultObjects["GradeInter8"] = gradename[resultsContainer[7]]
              resultObjects["GradeInter9"] = gradename[resultsContainer[8]]

              # finalResult << @resultVals
              finalResult << resultObjects
              #companies_json = companies.to_json
                
          end
     
       else

         @resultVals = []
         
       end




else
  #@results = WassceD2008.take(10)
   @resultVals = []

end

    respond_to do |format|

      if @resultVals.empty?
            format.html { render :new }
            format.json { render json: {success: false, message: "Candidate's Result is not available" }}
      else
            format.html {}
            format.json { render json: {success: true, results: finalResult} }
      end
    end
  end

  # def getResultStatus
    
  #    @page = (params[:page] || 0).to_i


  #     if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

  #         @year = Year.find_by(:YearName => params[:YearName])
  #         params[:yearId] = @year.id

  #         @diet = Diet.find_by(:DietName => params[:DietName])
  #         params[:dietId] = @diet.id
      
  

  #         if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

  #         @results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
                 
  #         else
  #           #@results = WassceD2008.take(10)
  #           @results = []
  #         end

  #     end
     
      

  #     if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

  #           @results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
                   
  #     else
  #             #@results = WassceD2008.take(10)
  #             @results =  []
  #     end


  #      respond_to do |format|

  #       if @results.present?


  #             @certToken = Exam.getToken()
  #             @Token = @certToken["access_token"]

  #             if @Token.present?
  #                params[:YearName] = Year.find_by(:id => params[:yearId] ).YearName
  #               #@status = Exam.getResultStatus(params[:CandNo], params[:YearName],  @Token )
  #                         response = Faraday.get do |req|
  #                         req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateStatus?"
  #                         req.params['ExamYear'] = params[:YearName]
  #                         req.params['CandidateNo'] = params[:CandNo]
  #                         req.headers['Authorization'] = 'Bearer ' +  @Token
  #                         #req.headers['Content-Type'] = 'application/json'
  #                       end

  #                    @status = JSON.parse(response.body)
  #             end

  #         #binding.pry
  #           @certToken

  #           format.html {}
  #           format.json { render json: {success: true, results: @results, status: @status} }
  #         else
  #           format.html { render :new }
  #           format.json { render json: {success: false, message: "Candidate's Result is not available" }}
  #         end
          
  #     end

  # end

  

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

    # def show
    # @location = Location.find(params[:id])
    # weather = Darksky.getData(@location)
    # render json: {location: @location, weather: weather}
    # end



  private

  	def exam_params
  		params.require(:exam).permit(:exam_name,:exam_diet,:table_name,:model_name)
  	end

  

 

end


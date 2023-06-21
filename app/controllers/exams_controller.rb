class ExamsController < ApplicationController
  include ApplicationHelper
  before_action :set_api_token


  before_action :authenticate_user!
 #before_action :set_table_name, only: [:show]
 #include HTTParty
 load_and_authorize_resource

  PAGE_SIZE = 10

  def index

    @page = (params[:page] || 0).to_i

    @token = session[:access_token]['access_token']
    params[:token] = @token

      if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

          @year = Year.find_by(:YearName => params[:YearName])
          params[:yearId] = @year.id

          @diet = Diet.find_by(:DietName => params[:DietName])
          params[:dietId] = @diet.id
      
  

          if params[:CandNo].present? && params[:examYear].present? && params[:token].present?## && params[:dietId].present? 

                  @results = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], params[:token])
                  
                  binding.pry 
   
          else
            #@results = WassceD2008.take(10)
            @results = []
          end

      end
     
  		

      #if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

      if params[:CandNo].present? && params[:examYear].present? && params[:token].present?## && params[:dietId].present? 

          @results = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], params[:token])
          
                   
      else
            	#@results = WassceD2008.take(10)
            	@results =  []
      end


       respond_to do |format|

        if @results["Surname"].present?      
            format.html {}
            format.json { render json: {success: true, results: @results} }
        else 
            format.html { render :new }
            format.json { render json: {success: false, message: @results}} #"Candidate's Result is not available" 
        end
          
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


  ### get getResultStatus
  def getSearchedResultDetails
      
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




 if params[:CandNo].present? && params[:examYear].present? && params[:token].present?## && params[:dietId].present? 

  @resultVals = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], params[:token])
  

binding.pry

##if params[:CandidateNo].present? && params[:ExamYear].present?

         ##@resultVals = Exam.getCompleteResultStatus(params[:CandidateNo], params[:ExamYear])

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

          
          @resultVals["exam_name"] = nil

          if params[:dietId].present? && ( @resultVals["ExamTitle"].nil? || @resultVals["ExamTitle"].length == 4 )

            #params[:ExamTitle] = @resultVals["ExamTitle"]
            @resultVals["exam_name"] = Diet.find_by(:id => params[:dietId]).DietName
           
            @resultVals["ExamTitle"] = @resultVals["exam_name"] + " " + @resultVals["ExamTitle"]

          end



          #binding.pry

          if @resultVals["CandNo"].length == 10


              # @centre = WaecCentre.where("centre_no = ?", @resultVals["CandNo"][0,7])
          @centre = WaecCentre.where(["CentreCode = ? and ExamYear = ?", @resultVals["CandNo"][0,7], params[:examYear]])
   
              #centres['centre'] = @centre
              resultObjects['Picture'] = @resultVals["Pix"]
              resultObjects['centre'] = @centre
              resultObjects['candNo'] = @resultVals["CandNo"]
              resultObjects['candName'] = @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"]
              resultObjects['ExamTitle'] = @resultVals["ExamTitle"] 
              resultObjects['examYear'] = params[:examYear] #@resultVals["examYear"]
              resultObjects['formNo'] = @resultVals["FormNo"]
              resultObjects['sex'] =  @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE'
              resultObjects['dob'] = @resultVals["DOB"] 
              resultObjects['dob2'] = @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4] #@results[0]["dob"]
              resultObjects['CentreName'] = @resultVals["CentreName"]
              resultObjects['CertificateStatus'] = @resultVals["CertificateStatus"]
              resultObjects['DatePrinted'] = @resultVals["DatePrinted"]
              resultObjects['DatePrinted2'] = @resultVals["DatePrinted"] == nil ? "N/A" : @resultVals["DatePrinted"][8,2] +"/"+ @resultVals["DatePrinted"][5,2]+"/"+ @resultVals["DatePrinted"][0,4] 
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
            @centre = WaecCentre.where(["CentreCode = ? and ExamYear = ?", @resultVals["CandNo"][0,5], params[:examYear]])
   

              # resultObjects['Picture'] = @resultVals["Pix"]
              # resultObjects['centre'] = @centre
              # resultObjects['candNo'] = @resultVals["CandNo"]
              # resultObjects['candName'] = @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"]
              # resultObjects['examType'] = @resultVals["examType"]
              # resultObjects['examYear'] = params[:ExamYear] #@resultVals["examYear"]
              # resultObjects['formNo'] = @resultVals["FormNo"]
              # resultObjects['sex'] =  @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE'
              # resultObjects['dob'] = @resultVals["DOB"] 
              # resultObjects['dob2'] = @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][0,2] +"/"+ @resultVals["DOB"][2,2]+"/"+ @resultVals["DOB"][-4,4] #@results[0]["dob"]
              # resultObjects['CentreName'] = @resultVals["CentreName"]
              # resultObjects['CertificateStatus'] = @resultVals["CertificateStatus"]
              # resultObjects['DatePrinted'] = @resultVals["DatePrinted"]
              resultObjects['centre'] = @centre
              resultObjects['candNo'] = @resultVals["CandNo"]
              resultObjects['candName'] = @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"]
              resultObjects['ExamTitle'] = @resultVals["ExamTitle"] 
              resultObjects['examYear'] = params[:examYear] #@resultVals["examYear"]
              resultObjects['formNo'] = @resultVals["FormNo"]
              resultObjects['sex'] =  @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE'
              resultObjects['dob'] = @resultVals["DOB"] 
              resultObjects['dob2'] = @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4] #@results[0]["dob"]
              resultObjects['CentreName'] = @resultVals["CentreName"]
              resultObjects['CertificateStatus'] = @resultVals["CertificateStatus"]
              resultObjects['DatePrinted'] = @resultVals["DatePrinted"]
              resultObjects['DatePrinted2'] = @resultVals["DatePrinted"] == nil ? "N/A" : @resultVals["DatePrinted"][8,2] +"/"+ @resultVals["DatePrinted"][5,2]+"/"+ @resultVals["DatePrinted"][0,4] 
              resultObjects["Subject1"] = subjectindex[subjectsContainer[0]]
              resultObjects["Subject2"] = subjectindex[subjectsContainer[1]]
              resultObjects["Subject3"] = subjectindex[subjectsContainer[2]]
              resultObjects["Subject4"] = subjectindex[subjectsContainer[3]]
              resultObjects["Subject5"] = subjectindex[subjectsContainer[4]]
              resultObjects["Subject6"] = subjectindex[subjectsContainer[5]]
              resultObjects["Subject7"] = subjectindex[subjectsContainer[6]]
              resultObjects["Subject8"] = subjectindex[subjectsContainer[7]]
              resultObjects["Subject9"] = subjectindex[subjectsContainer[8]]

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


  ### get getResultStatus
  def getSearchedResultDetailsForConfirmation

    params[:token] = nil

      
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

params[:token] = nil

resultContainer = []
resultObjects = Hash.new
finalResult = []

if session[:access_token].present?
 params[:token] = session[:access_token]['access_token']
else
 session[:access_token] = ApiResult.getToken()
 params[:token] = session[:access_token]['access_token']
 
end



if params[:CandNo].present? && params[:examYear].present? ##&& params[:token].present?## && params[:dietId].present? 

  if params[:isPrinted] == 'true'

    @resultVals = ConfirmBackupDatum.find_by(:confirmation_id => params[:confirmID])
      #binding.pry
    if @resultVals.nil?

      @resultVals = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], params[:token])
      #binding.pry
    end

  else
    @resultVals = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], params[:token])
    #binding.pry
  end

if  params[:isPrinted] == 'false' && @resultVals.present?

  	ConfirmBackupDatum.create(:confirmation_id => params[:confirmID], :CandNo => @resultVals["CandNo"], 
                        :Results => @resultVals["Results"] , :FormNo => @resultVals["FormNo"], :Surname => @resultVals["Surname"], 
                        :FirstName => @resultVals["FirstName"], :OtherNames => @resultVals["OtherNames"], :DOB  => @resultVals["DOB"], 
                        :Sex => @resultVals["Sex"], :Pix => @resultVals["Pix"], :CentreName => @resultVals["CentreName"], 
                        :CertificateNo => @resultVals["CertificateNo"], :SecurityDigit => @resultVals["SecurityDigit"], 
                        :Award => @resultVals["Award"], :CertificateStatus => @resultVals["CertificateStatus"], 
                        :DatePrinted => @resultVals["DatePrinted"], :ExamTitle => @resultVals["ExamTitle"])
    
end

binding.pry

##if params[:CandidateNo].present? && params[:ExamYear].present?

      ##@resultVals = Exam.getCompleteResultStatus(params[:CandidateNo], params[:ExamYear])
##binding.pry
subjectsContainer = Hash.new
resultsContainer = Hash.new
gradsInterpsContainer = Hash.new
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


       if @resultVals["CandNo"].length == 10


           # @centre = WaecCentre.where("centre_no = ?", @resultVals["CandNo"][0,7])
       @centre = WaecCentre.where(["CentreCode = ? and ExamYear = ?", @resultVals["CandNo"][0,7], params[:examYear]])

           #centres['centre'] = @centre
           resultObjects['Picture'] = @resultVals["Pix"]
           resultObjects['centre'] = @centre
           resultObjects['candNo'] = @resultVals["CandNo"]
           resultObjects['candName'] = @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"]
           resultObjects['ExamTitle'] = @resultVals["ExamTitle"]
           resultObjects['examYear'] = params[:examYear] #@resultVals["examYear"]
           resultObjects['formNo'] = @resultVals["FormNo"]
           resultObjects['sex'] =  @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE'
           resultObjects['dob'] = @resultVals["DOB"] 
           resultObjects['dob2'] = @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4] #@results[0]["dob"]
           resultObjects['CentreName'] = @resultVals["CentreName"]
           resultObjects['CertificateStatus'] = @resultVals["CertificateStatus"]
           resultObjects['DatePrinted'] = @resultVals["DatePrinted"]
           resultObjects['DatePrinted2'] = @resultVals["DatePrinted"] == nil ? "N/A" : @resultVals["DatePrinted"][8,2] +"/"+ @resultVals["DatePrinted"][5,2]+"/"+ @resultVals["DatePrinted"][0,4] 
           
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

           #binding.pry
             
       end
  
    else

      @resultVals = []
      
    end

else
#@results = WassceD2008.take(10)
@resultVals = []

end

if @resultVals.present?

#  binding.pry
  
  subjectsContainer = Array.wrap([ resultObjects["Subject1"], resultObjects["Subject2"], resultObjects["Subject3"],
    resultObjects["Subject4"],  resultObjects["Subject5"], resultObjects["Subject6"],
    resultObjects["Subject7"],  resultObjects["Subject8"], resultObjects["Subject9"]
    ])


resultsContainer = Array.wrap([ resultObjects["Grade1"], resultObjects["Grade2"], resultObjects["Grade3"],
  resultObjects["Grade4"],  resultObjects["Grade5"],resultObjects["Grade6"],
  resultObjects["Grade7"], resultObjects["Grade8"],  resultObjects["Grade9"]])

gradsInterpsContainer = Array.wrap([ resultObjects["GradeInter1"], resultObjects["GradeInter2"], resultObjects["GradeInter3"],
  resultObjects["GradeInter4"],  resultObjects["GradeInter5"],resultObjects["GradeInter6"],
  resultObjects["GradeInter7"], resultObjects["GradeInter8"],  resultObjects["GradeInter9"]])

#binding.pry  

gradeindex[subjectsContainer]
subjectindex[subjectsContainer]
resultObjects = Hash.new
finalResult = []
resultsArray = []


unless subjectsContainer[0].nil?

  hash0 = {
           :Subject=> subjectsContainer[0], 
           :Grade => resultsContainer[0],
           :GradeInter => gradsInterpsContainer[0],
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]           
 }

 resultsArray << hash0
end

unless subjectsContainer[1].nil?

 hash1 = { 
          :Subject=> subjectsContainer[1], 
          :Grade => resultsContainer[1],
          :GradeInter => gradsInterpsContainer[1],
          :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]  
         }
     resultsArray << hash1
end

unless subjectsContainer[2].nil?

 hash2 = {
          :Subject=> subjectsContainer[2], 
          :Grade => resultsContainer[2],
          :GradeInter => gradsInterpsContainer[2], 
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]  
 }
     resultsArray << hash2
end

unless subjectsContainer[3].nil?
 hash3 = {
          :Subject=> subjectsContainer[3], 
          :Grade => resultsContainer[3],
          :GradeInter => gradsInterpsContainer[3], 
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]  
          }
     resultsArray << hash3
end

unless subjectsContainer[4].nil?
 hash4 = {
          :Subject=> subjectsContainer[4], 
          :Grade => resultsContainer[4],
          :GradeInter => gradsInterpsContainer[4], 
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]  
       }
     resultsArray << hash4
end

unless subjectsContainer[5].nil?
 hash5 = {
          :Subject=> subjectsContainer[5], 
          :Grade => resultsContainer[5],
          :GradeInter => gradsInterpsContainer[5], 
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]  
  }
       resultsArray << hash5
end

unless subjectsContainer[6].nil?
 hash6 = {
          :Subject=> subjectsContainer[6], 
          :Grade => resultsContainer[6],
          :GradeInter => gradsInterpsContainer[6], 
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]  
        }

     resultsArray << hash6
end
unless subjectsContainer[7].nil?
 hash7 = {
          :Subject=> subjectsContainer[7], 
          :Grade => resultsContainer[7],
          :GradeInter => gradsInterpsContainer[7], 
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"]  
         }
   resultsArray << hash7
end

unless subjectsContainer[8].nil?
 hash8 = {
          :Subject=> subjectsContainer[8], 
          :Grade => resultsContainer[8],
          :GradeInter => gradsInterpsContainer[8], 
           :candNo => @resultVals["CandNo"],
           :candName => @resultVals["Surname"] +" "+ @resultVals["FirstName"] +" "+ @resultVals["OtherNames"],
           :examType => @resultVals["ExamTitle"],
           #:examType => @results[0]["examType"],
           :examYear => params[:ExamYear],
           :formNo => @resultVals["FormNo"],
           :sex => @resultVals["Sex"] =='1'? 'MALE' : 'FEMALE',
           :sex2 => @resultVals["sex"],
           :dob =>@resultVals["DOB"],
           :dob2 => @resultVals["DOB"] == nil ? "N/A" : @resultVals["DOB"][8,2] +"/"+ @resultVals["DOB"][5,2]+"/"+ @resultVals["DOB"][0,4],
           :CentreName => @resultVals["CentreName"] == nil ? "N/A" : @resultVals["CentreName"], 
           :Picture => @resultVals["Pix"],  
           :CertificateStatus =>  @resultVals["CertificateStatus"],  
           :DatePrinted => @resultVals["DatePrinted"],  
        }
   resultsArray << hash8

end

resultsArray[0][:NoOfSubjects] =  resultsArray.length   

     finalResult << resultsArray

     
  #binding.pry


  
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


  def retrieveWESApplicantInfo
    @resultVals = {}

    if params[:refNumber].present? && params[:url].present? 

      if session[:Wes_access_token]['token'].nil?
        @Wes_access_token  =  Exam.wesConnection() 
        session[:Wes_access_token] = @Wes_access_token 
      end

      params[:baseURL] = params[:url]+params[:refNumber]
    
      @resultVals = Exam.getWESApplicantInfo(params[:baseURL], params[:refNumber], session[:Wes_access_token]['token'] )

      ##binding.pry
    else
      @resultVals = {}

    end

   respond_to do |format|
    if  @resultVals.nil?     
      
      format.json { render json: {success: false, message: "Candidate's details not available" }}
    
    else
      format.json { render json: {success: true, results: @resultVals} }
    
    end
  end
    
  end


  def connectToWesAPI
    
    if session[:Wes_access_token].present?
      @Wes_access_token = session[:Wes_access_token]['token']
    else
      @Wes_access_token  =  Exam.wesConnection() 
      session[:Wes_access_token] = @Wes_access_token 
      
    end
    ##binding.pry  

    respond_to do |format|

      if @Wes_access_token.nil?          
            format.json { render json: {success: false, message: "WEB Service not available" }}
      else
            format.json { render json: {success: true, results: @Wes_access_token } }
      end
    end
  end

  def transferFileToWesAPI
    
    @resultVals = {}
    
    if params[:refNumber].present? && params[:content].present?

      if session[:Wes_access_token]['token'].nil?
        @Wes_access_token  =  Exam.wesConnection() 
        session[:Wes_access_token] = @Wes_access_token 
      end
    
      #binding.pry 

      @resultVals = Exam.sendBase64ConfirmationToClient(params[:url], params[:refNumber], session[:Wes_access_token]['token'], params[:content], params[:title], params[:filesize] )

      @resultVals = @resultVals.to_json
      @resultVals = JSON.parse(@resultVals)

      ##:confirmation_id, :clientUploadId, :referenceNumber, :status, :uploadId)
    #params[:confirmation_id] = params[:confirmation_id]
    params[:clientUploadId] = @resultVals["id"]
    params[:referenceNumber] = @resultVals["results"][0]["fileInfo"]["referenceNumber"]
    params[:status] = @resultVals["results"][0]["fileInfo"]["status"]
    params[:uploadId] = @resultVals["results"][0]["fileInfo"]["id"]
      

# [4] pry(#<ExamsController>)> @resultVals["results"]
# => [{"fileName"=>"3607884.pdf",
#   "fileInfo"=>{"referenceNumber"=>3607884, "status"=>"Accepted", "fileName"=>"3607884.pdf", "id"=>1715},
#   "success"=>true,
#   "message"=>"Success"}]                             ^
# [5] pry(#<ExamsController>)> @resultVals["results"][0]["fileName"]
# => "3607884.pdf"
# [6] pry(#<ExamsController>)> @resultVals["results"][0]["fileInfo"]
# => {"referenceNumber"=>3607884, "status"=>"Accepted", "fileName"=>"3607884.pdf", "id"=>1715}  

    respond_to do |format|
        if  @resultVals["results"][0]["success"] == false
  
          format.json { render json: {success: false, message: @resultVals["results"][0]["message"] }}
        
        else
    #binding.pry
            @web_service_file_upload_response = WebServiceFileUploadResponse.create(
              confirmation_id: params[:confirmation_id], 
              clientUploadId: params[:clientUploadId], 
              referenceNumber: params[:referenceNumber],
              status: params[:status], 
              uploadId: params[:uploadId]
            )

            if @web_service_file_upload_response.save 

            else
            @resultVals = {}

            end
          format.json { render json: {success: true} }
        
        end
      end
    end
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

    # def show
    # @location = Location.find(params[:id])
    # weather = Darksky.getData(@location)
    # render json: {location: @location, weather: weather}
    # end



  private

  def set_api_token
    if session[:access_token].present?
      params[:token] = session[:access_token]['access_token']
    else
      session[:access_token] = ApiResult.getToken()
      params[:token] = session[:access_token]['access_token']
      #binding.pry
    end
  end

  	def exam_params
  		params.require(:exam).permit(:exam_name,:exam_diet,:table_name,:model_name)
  	end

  

 

end


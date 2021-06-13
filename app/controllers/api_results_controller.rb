class ApiResultsController < ApplicationController
  before_action :set_api_result, only: [:show, :edit, :update, :destroy]

  # GET /api_results
  # GET /api_results.json
  # def index
  #   @api_results = ApiResult.all
  # end

  def index

    @page = (params[:page] || 0).to_i


      if params[:CandNo].present? && params[:DietName].present? 

          # @year = Year.find_by(:YearName => params[:YearName])
          # params[:yearId] = @year.id

          @diet = Diet.find_by(:DietName => params[:DietName])
          params[:dietId] = @diet.id
      
  

          if params[:CandNo].present? && params[:examYear].present? && params[:dietId].present?
#binding.pry
          #   response = Faraday.get do |req|
          #   req.url "http://172.21.13.44/WaecMobileApi/api/WaecMobile/GetResultForConfirmation?"
          #   req.params['CandNo'] = '#{params[:CandNo]}'
          #   req.params['yearId'] = '#{params[:yearId]}'
          #   req.params['dietId'] = '#{params[:dietId]}'
          #   req.headers['Content-Type'] = 'application/json'
          # end
          # @results = response.body
          #@results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
          #@results = Exam.getSearchedResults(params[:CandNo], params[:examYear], , params[:dietId])
          @results = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], params[:dietId])
            #binding.pry  
                 
          else
            #@results = WassceD2008.take(10)
            @results = []
          end

      end
     
      

      if params[:CandNo].present? && params[:examYear].present? && params[:dietId].present?

             @results = Exam.getSearchedCandidate(params[:CandNo], params[:examYear], params[:dietId])
           #binding.pry        
      else
              #@results = WassceD2008.take(10)
              @results =  []
      end


    respond_to do |format|

        if @results.present?




            format.html {}
            format.json { render json: {success: true, results: @results} }
          else
            format.html { render :new }
            format.json { render json: {success: false, message: "Candidate's Result is not available" }}
          end
          
      end

  end


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
        "311"=>"MATHEMATICS",
         "321"=>"STATS",
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


    resultContainer = []
      if params[:CandNo].present? && params[:DietName].present? 

          @diet = Diet.find_by(:DietName => params[:DietName])
          params[:dietId] = @diet.id
      
  

          if params[:CandNo].present? && params[:examYear].present? && params[:dietId].present?

            @results = ApiResult.getDetailedResults(params[:CandNo], params[:examYear], params[:dietId])
            #binding.pry  
                 
          else
            #@results = WassceD2008.take(10)
            @results = []
          end

      end
     
      

      if params[:CandNo].present? && params[:examYear].present? && params[:dietId].present?

             @results = ApiResult.getDetailedResults(params[:CandNo], params[:examYear], params[:dietId])
              

       subjectsContainer = Array.wrap([ @results[0]["subject1"], @results[0]["subject2"], @results[0]["subject3"],
                                     @results[0]["subject4"],  @results[0]["subject5"], @results[0]["subject6"],
                                    @results[0]["subject7"], @results[0]["subject8"], @results[0]["subject9"]])

    resultsContainer = Array.wrap([ @results[0]["result1"], @results[0]["result2"], @results[0]["result3"],
                                     @results[0]["result4"],  @results[0]["result5"], @results[0]["result6"],
                                    @results[0]["result7"], @results[0]["result8"], @results[0]["result9"]])
   
  gradeindex[resultsContainer[0]]
  subjectindex[subjectsContainer[0]]
  resultObjects = Hash.new
  finalResult = []
  resultsArray = []
          # if @entry.form_no.nil?
          #   pix_filename='public/images/pix/'+ @waec_confirmation.waec_exam.pix_folder+'/pict/'+ @entry.exam_no[0..6] +'/' +  @entry.exam_no + '.jpg'
          # else
          #   pix_filename='public/images/pix/'+ @waec_confirmation.waec_exam.pix_folder+'/pict/'+ @entry.exam_no[0..6] +'/' +  @entry.form_no + '.jpg'
            
          # end

          ## Result Interpretation For Exam years from 1999 to This day.

  if @results[0]["candNo"].length == 10



        @centre = WaecCentre.where("centre_no = ?", @results[0]["candNo"][0,7])
    ## Setting Centre Name to it's value otherwise to return empty.

              if  @centre == [] || @centre == [""]
                @centre = nil
              else
                @centre
              end
    ## Setting setting picture folder path

              if @results[0]["candNo"][0,1]=='5'
                @pix_folder = "ndall/nd"+@results[0]["examYear"]
              else
                 @pix_folder = "mjall/mj"+@results[0]["examYear"]
              end

      ## Determining the Diet of the exam

              if (@results[0]["examYear"] >= '2019') && (@results[0]["candNo"][7,3] <= '500')
                 @pix_folder =  @pix_folder+"-fs"

              elsif (@results[0]["examYear"] >= '2019') && (@results[0]["candNo"][7,3] > '500')
                  @pix_folder =  @pix_folder+"-ss"
              else
                  @pix_folder
              end



    # unless @results[0]["formNo"].nil?
    #   pix_filename='public/images/pix/'+ @pix_folder+'/pict/'+@results[0]["candNo"][0..6]+'/'+@results[0]["formNo"].strip!+ '.jpg'
    # else
    #   pix_filename='public/images/pix/'+ @pix_folder+'/pict/'+@results[0]["candNo"][0..6]+'/'+@results[0]["candNo"].strip!+ '.jpg'
    # end

    unless @results[0]["formNo"].nil?
      pix_filename='../images/pix/'+@pix_folder+'/pict/'+@results[0]["candNo"][0..6]+'/'+@results[0]["formNo"].strip!+ '.jpg'
        #pix_filename = 'public/images/pix/'+@pix_folder+'/pict/'+@results[0]["candNo"][0..6]+'/'+@results[0]["formNo"].strip!+'.jpg'
    else
      pix_filename = '../images/pix/'+@pix_folder+'/pict/'+@results[0]["candNo"][0..6]+'/'+@results[0]["candNo"].strip!+ '.jpg'
    end

   #ayo = Rails.root.join("public", "Images", "Pix", "mjall", "pict", @results[0]["candNo"][0..6]+'/'+@results[0]["formNo"].strip!+'.jpg').to_s
   #ayo2 =  Rails.root.join("public", "Images", "Pix", "ndall" ,"pict")+'/'+@results[0]["candNo"][0..6]+'/'+@results[0]["formNo"].strip!+'.jpg'
 
      resultObjects['Picture'] = pix_filename
      #pix_filename = "#{Rails.root}/"+pix_filename


     
#      #resultObjects['Picture'] = StringIO.new(Base64.encode64(("#{Rails.root}/"+pix_filename).split(',')[1]))
#      #require 'base64'

# require 'open-uri'
#  file_contents2 = open(pix_filename)
#   file_contents = open(pix_filename) { |f| f.read }

#    #resultObjects['Picture2'] =  File.open(pix_filename)

#    image = File.open(pix_filename) {|img| img.read}
#  #   encoded2 = Base64.strict_encode64(resultObjects['Picture2'])

#     resultObjects['Picture2'] = Base64.encode64 image
#     resultObjects['Picture3'] = Base64.encode64 file_contents.read


     #binding.pry
            
              #centres['centre'] = @centre
              resultObjects['centre'] = @centre
              resultObjects['candNo'] = @results[0]["candNo"]
              resultObjects['candName'] = @results[0]["candName"]
              resultObjects['examType'] = @results[0]["examType"]
              resultObjects['examYear'] = @results[0]["examYear"]
              resultObjects['formNo'] = @results[0]["formNo"][0,11]
              resultObjects['sex'] =  @results[0]["sex"] =='1'? 'MALE' : 'FEMALE'
              resultObjects['dob'] = @results[0]["date_of_Birth"] 
              resultObjects['dob2'] = @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4] #@results[0]["dob"]
              resultObjects['CentreName'] = @centre == nil ? "N/A" : @centre[0]['centre_name']

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


              unless subjectindex[subjectsContainer[0]].nil?

                 hash0 = {
                          :Subject=> subjectindex[subjectsContainer[0]], 
                          :Grade => gradeindex[resultsContainer[0]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :sex2 => @results[0]["sex"],
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'], 
                          :Picture => resultObjects['Picture'],  
                          :Picture2 => resultObjects['Picture2'],             
                }

                resultsArray << hash0
              end

              unless subjectindex[subjectsContainer[1]].nil?

                hash1 = { 
                          :Subject=> subjectindex[subjectsContainer[1]], 
                          :Grade => gradeindex[resultsContainer[1]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'], 
                        }
                    resultsArray << hash1
              end

              unless subjectindex[subjectsContainer[2]].nil?

                hash2 = {
                          :Subject=> subjectindex[subjectsContainer[2]], 
                          :Grade => gradeindex[resultsContainer[2]], 
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }
                    resultsArray << hash2
              end

              unless subjectindex[subjectsContainer[3]].nil?
                hash3 = {
                          :Subject=> subjectindex[subjectsContainer[3]], 
                          :Grade => gradeindex[resultsContainer[3]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }
                    resultsArray << hash3
              end

            unless subjectindex[subjectsContainer[4]].nil?
                hash4 = {
                          :Subject=> subjectindex[subjectsContainer[4]], 
                          :Grade => gradeindex[resultsContainer[4]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                      }
                    resultsArray << hash4
              end

            unless subjectindex[subjectsContainer[5]].nil?
                hash5 = {
                          :Subject=> subjectindex[subjectsContainer[5]], 
                          :Grade => gradeindex[resultsContainer[5]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'], 
                 }
                      resultsArray << hash5
              end

            unless subjectindex[subjectsContainer[6]].nil?
                hash6 = {
                          :Subject=> subjectindex[subjectsContainer[6]], 
                          :Grade => gradeindex[resultsContainer[6]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }

                    resultsArray << hash6
          end
          unless subjectindex[subjectsContainer[7]].nil?
                hash7 = {
                          :Subject=> subjectindex[subjectsContainer[7]], 
                          :Grade => gradeindex[resultsContainer[7]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'], 
                        }
                  resultsArray << hash7
          end

          unless subjectindex[subjectsContainer[8]].nil?
                hash8 = {
                          :Subject=> subjectindex[subjectsContainer[8]], 
                          :Grade => gradeindex[resultsContainer[8]],
                          :candNo => @results[0]["candNo"][0,7] +"/"+ @results[0]["candNo"][7,3],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }
                  resultsArray << hash8

          end

          resultsArray[0][:NoOfSubjects] =  resultsArray.length 
    

         #binding.pry


              # finalResult << @results
              # finalResult << resultObjects
              finalResult << resultsArray


    else
                ##Result Interpretation for Years Below 1999 (That is 1998 downward)
                              ## Interpret all subjects

              @centre = WaecCentre.where("centre_no = ?", @results[0]["candNo"][0,5])

              if  @centre == [] || @centre == [""]
                @centre = nil
              else
                @centre
              end
            
              #centres['centre'] = @centre
              resultObjects['centre'] = @centre
              resultObjects['candNo'] = @results[0]["candNo"]
              resultObjects['candName'] = @results[0]["candName"]
              resultObjects['examType'] = @results[0]["examType"]
              resultObjects['examYear'] = @results[0]["examYear"]
              resultObjects['formNo'] = @results[0]["formNo"][0,11]
              resultObjects['sex'] =  @results[0]["sex"] =='1'? 'MALE' : 'FEMALE'
              resultObjects['dob'] = @results[0]["date_of_Birth"] 
              resultObjects['dob2'] = @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4] #@results[0]["dob"]
              resultObjects['CentreName'] = @centre == nil ? "N/A" : @centre[0]['centre_name']

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


              unless subjectindex[subjectsContainer[0]].nil?

                 hash0 = {
                          :Subject=> subjectindex[subjectsContainer[0]], 
                          :Grade => gradeindex[resultsContainer[0]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :sex2 => @results[0]["sex"],
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],               
                }

                resultsArray << hash0
              end

              unless subjectindex[subjectsContainer[1]].nil?

                hash1 = { 
                          :Subject=> subjectindex[subjectsContainer[1]], 
                          :Grade => gradeindex[resultsContainer[1]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'], 
                        }
                    resultsArray << hash1
              end

                unless subjectindex[subjectsContainer[2]].nil?

                hash2 = {
                          :Subject=> subjectindex[subjectsContainer[2]], 
                          :Grade => gradeindex[resultsContainer[2]], 
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }
                    resultsArray << hash2
              end

              unless subjectindex[subjectsContainer[3]].nil?
                hash3 = {
                          :Subject=> subjectindex[subjectsContainer[3]], 
                          :Grade => gradeindex[resultsContainer[3]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }
                    resultsArray << hash3
              end

            unless subjectindex[subjectsContainer[4]].nil?
                hash4 = {
                          :Subject=> subjectindex[subjectsContainer[4]], 
                          :Grade => gradeindex[resultsContainer[4]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                      }
                    resultsArray << hash4
              end

            unless subjectindex[subjectsContainer[5]].nil?
                hash5 = {
                          :Subject=> subjectindex[subjectsContainer[5]], 
                          :Grade => gradeindex[resultsContainer[5]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'], 
                 }
                      resultsArray << hash5
              end

            unless subjectindex[subjectsContainer[6]].nil?
                hash6 = {
                          :Subject=> subjectindex[subjectsContainer[6]], 
                          :Grade => gradeindex[resultsContainer[6]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }

                    resultsArray << hash6
          end
          unless subjectindex[subjectsContainer[7]].nil?
                hash7 = {
                          :Subject=> subjectindex[subjectsContainer[7]], 
                          :Grade => gradeindex[resultsContainer[7]],
                          :candNo => @results[0]["candNo"],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'], 
                        }
                  resultsArray << hash7
          end

          unless subjectindex[subjectsContainer[8]].nil?
                hash8 = {
                          :Subject=> subjectindex[subjectsContainer[8]], 
                          :Grade => gradeindex[resultsContainer[8]],
                          :candNo => @results[0]["candNo"][0,7] +"/"+ @results[0]["candNo"][7,3],
                          :candName => @results[0]["candName"],
                          :examType => @results[0]["examType"],
                          :examYear => @results[0]["examYear"],
                          :formNo => @results[0]["formNo"][0,11],
                          :sex => @results[0]["sex"] =='1'? 'MALE' : 'FEMALE',
                          :dob => @results[0]["date_of_Birth"],
                          :dob2 => @results[0]["date_of_Birth"] == nil ? "N/A" : @results[0]["date_of_Birth"][0,2] +"/"+ @results[0]["date_of_Birth"][2,2]+"/"+ @results[0]["date_of_Birth"][-4,4],
                          :CentreName => @centre == nil ? "N/A" : @centre[0]['centre_name'],
                       }
                  resultsArray << hash8

          end

          resultsArray[0][:NoOfSubjects] =  resultsArray.length 
    

         #binding.pry


              # finalResult << @results
              # finalResult << resultObjects
              finalResult << resultsArray
          end

           

      else
              #@results = WassceD2008.take(10)
              @results =  []
      end


    respond_to do |format|

        if @results.present?      
            format.html {}
            format.json { render json: {success: true, results: finalResult} }
          else
            format.html { render :new }
            format.json { render json: {success: false, message: "Candidate's Result is not available" }}
          end
          
      end

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

    if params[:candName].present? && params[:yearId].present? && params[:dietId].present?
            
            #@results = Exam.getDataByCandName(params[:candName], params[:yearId], params[:dietId])
      #("Candidate_Name/candName={candName}&yearId={yearId}&dietId={dietId}")
         
          response = Faraday.get do |req|
              req.url "http://172.21.13.25/resultapi/results/Candidate_Name?"
              req.params['candName'] = params[:candName]
              req.params['yearId'] =  params[:yearId]
              req.params['dietId'] = params[:dietId]
              req.headers['Content-Type'] = 'application/JSON'
            end
            #binding.pry  
            @results = JSON.parse(response.body)

    else
            #@results = WassceD2008.take(10)
            @results = []
    end

         respond_to do |format|
          if @results.present?
            
          
            format.html {}
            format.json { render json: {success: true, results: @results} }
          else
            format.html { render :new }
            format.json { render json: {success: false, message: "Candidate's Result is not available" }}
          end
        end

  
  
  end

  def getResultStatus
    
     @page = (params[:page] || 0).to_i


      if params[:CandNo].present? && params[:DietName].present? && params[:YearName]

          @year = Year.find_by(:YearName => params[:YearName])
          params[:yearId] = @year.id

          @diet = Diet.find_by(:DietName => params[:DietName])
          params[:dietId] = @diet.id
      
  

          if params[:CandNo].present? && params[:yearId].present? && params[:dietId].present?

          @results = Exam.getData(params[:CandNo], params[:yearId], params[:dietId])
                 
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


              @certToken = Exam.getToken()
              @Token = @certToken["access_token"]

              if @Token.present?
                 params[:YearName] = Year.find_by(:id => params[:yearId] ).YearName
                #@status = Exam.getResultStatus(params[:CandNo], params[:YearName],  @Token )
                          response = Faraday.get do |req|
                          req.url "https://ictdapps.waec.org.ng/WaecCert/Services/GetCertificateStatus?"
                          req.params['ExamYear'] = params[:YearName]
                          req.params['CandidateNo'] = params[:CandNo]
                          req.headers['Authorization'] = 'Bearer ' +  @Token
                          #req.headers['Content-Type'] = 'application/json'
                        end

                     @status = JSON.parse(response.body)
              end

          #binding.pry
            @certToken

            format.html {}
            format.json { render json: {success: true, results: @results, status: @status} }
          else
            format.html { render :new }
            format.json { render json: {success: false, message: "Candidate's Result is not available" }}
          end
          
      end

  end

  # GET /api_results/1
  # GET /api_results/1.json
  # def show
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

  # GET /api_results/new
  def new
    @api_result = ApiResult.new
  end

  # GET /api_results/1/edit
  def edit
  end

  # POST /api_results
  # POST /api_results.json
  def create
    @api_result = ApiResult.new(api_result_params)

    respond_to do |format|
      if @api_result.save
        format.html { redirect_to @api_result, notice: 'Api result was successfully created.' }
        format.json { render :show, status: :created, location: @api_result }
      else
        format.html { render :new }
        format.json { render json: @api_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /api_results/1
  # PATCH/PUT /api_results/1.json
  def update
    @api_result = ApiResult.find(params[:id])
    respond_to do |format|
      if @api_result.update(api_result_params)
        format.html { redirect_to @api_result, notice: 'Api result was successfully updated.' }
        format.json { render :show, status: :ok, location: @api_result }
      else
        format.html { render :edit }
        format.json { render json: @api_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /api_results/1
  # DELETE /api_results/1.json
  def destroy
    @api_result = ApiResult.find(params[:id])
    @api_result.destroy
    respond_to do |format|
      format.html { redirect_to api_results_url, notice: 'Api result was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_api_result
    #   @api_result = ApiResult.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def api_result_params
      params.fetch(:api_result, {})
    end
end


          # if @entry.form_no.nil?
          #   pix_filename='public/images/pix/'+ @waec_confirmation.waec_exam.pix_folder+'/pict/'+ @entry.exam_no[0..6] +'/' +  @entry.exam_no + '.jpg'
          # else
          #   pix_filename='public/images/pix/'+ @waec_confirmation.waec_exam.pix_folder+'/pict/'+ @entry.exam_no[0..6] +'/' +  @entry.form_no + '.jpg'
            
          # end

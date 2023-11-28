class WaecExamsController < ApplicationController
  before_action :set_waec_exam, only: [:show, :edit, :update, :destroy]

  # GET /waec_exams
  # GET /waec_exams.json
  def index
    @diets = []

            sql = <<-SQL 

            SELECT [id] ,[exam_name] ,[exam_diet] FROM [dbo].[waec_exams] order by exam_diet

            SQL

            @diets = WaecExam.connection.exec_query(sql)

        #binding.pry

        respond_to do |format|
          if @diets.nil?     
            
            format.json { render json: {success: false, message: "Verifier System is unavailable" }}
          
          else
            format.json { render json: {success: true, results: @diets} }
          
          end
        end
  end

  def SearchCandidateFromVerifier888888
   
    ##{"CandNo"=>"4250304008", "dietId"=>"31"}
    @diet = nil, params[:table_name] = nil
    if  params[:dietId].present?

      sql = <<-SQL 

      SELECT [id]
      ,[exam_name]
      ,[exam_diet]
      ,[table_name]
      ,[centre_table_name]
      ,[pix_folder]
      ,[created_at]
      ,[consolidated]
      ,[waec_user_id]
      ,[exam_year]
      ,[isSingleDigit]
      ,[exam_title_name]
      ,[sub_exam_title_name]
      ,[exam_type_code]
  FROM [dbo].[waec_exams]
  where [id] = '#{params[:dietId]}'

      SQL

      @diet = WaecExam.connection.exec_query(sql)
      
     

      params[:table_name] = @diet[0]["table_name"]

     
    end

    if params[:CandNo].present? && params[:table_name].present?

      @entry =  WaecExam.find_by_sql ["SELECT * FROM dbo."+params[:table_name] +" WHERE exam_no = ? ", params[:CandNo] ]

    else

      @entry = []

    end

    if @entry.present?

      params[:entry] = @entry.to_json

    end

  #binding.pry

        #binding.pry

        respond_to do |format|
          if @entry.nil?     
            
            format.json { render json: {success: false, message: "Verifier System is unavailable" }}
          
          else
            format.json { render json: {success: true, results:  @entry} }
          
          end
        end
  end

  # GET /waec_exams/1
  # GET /waec_exams/1.json
  def show
  end

  # GET /waec_exams/new
  def new
    @waec_exam = WaecExam.new
  end

  # GET /waec_exams/1/edit
  def edit
  end

  # POST /waec_exams
  # POST /waec_exams.json
  def create
    @waec_exam = WaecExam.new(waec_exam_params)

    respond_to do |format|
      if @waec_exam.save
        format.html { redirect_to @waec_exam, notice: 'Waec exam was successfully created.' }
        format.json { render :show, status: :created, location: @waec_exam }
      else
        format.html { render :new }
        format.json { render json: @waec_exam.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /waec_exams/1
  # PATCH/PUT /waec_exams/1.json
  def update
    respond_to do |format|
      if @waec_exam.update(waec_exam_params)
        format.html { redirect_to @waec_exam, notice: 'Waec exam was successfully updated.' }
        format.json { render :show, status: :ok, location: @waec_exam }
      else
        format.html { render :edit }
        format.json { render json: @waec_exam.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /waec_exams/1
  # DELETE /waec_exams/1.json
  def destroy
    @waec_exam.destroy
    respond_to do |format|
      format.html { redirect_to waec_exams_url, notice: 'Waec exam was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def confirmations

		params[:office_id] = current_user.office_id
		
		if current_user.role == "audit_role"
		#@confirms = Confirmation.all.paginate(:page => params[:page], :per_page => 10).order("created_at DESC")

		             sql = <<-SQL 

        SELECT  a.[id] ,a.[user_id] ,b.exam_diet, a.[examYear], a.[ref_no],a.[exam_no]
       ,a.[Cand_address] ,a.[dest_title] ,a.[dest_address1] ,a.[dest_address2]
       ,a.[dest_location] ,a.[dest_email] ,a.[created_at] ,a.[updated_at] ,d.[office_name] ,a.[receipt_no], a.[WES_Ref], a.[isPrinted], a.IsVeriferResult
           FROM [dbo].[confirmations] a
           inner join [dbo].waec_exams b
           on a.diet_id = b.id
           inner join [dbo].[offices] d
           on a.office_id = d.id
           where IsVeriferResult = 1
           order by a.[created_at] DESC
           
			  SQL

            @confirms = ActiveRecord::Base.connection.exec_query(sql)


	    else
		#@confirms = Confirmation.where(:office_id => current_user.office_id).paginate(:page => params[:page], :per_page => 10).order("created_at DESC")
		#@confirms = Confirmation.where(:ref_no[0,11] => current_user.office_id).order("created_at DESC")
		 # respond_to do |format|

             sql = <<-SQL 

             SELECT  a.[id] ,a.[user_id] ,b.exam_diet, a.[examYear], a.[ref_no],a.[exam_no]
             ,a.[Cand_address] ,a.[dest_title] ,a.[dest_address1] ,a.[dest_address2]
             ,a.[dest_location] ,a.[dest_email] ,a.[created_at] ,a.[updated_at] ,d.[office_name] ,a.[receipt_no], a.[WES_Ref], a.[isPrinted], 
             a.IsVeriferResult, a.diet_id 
                 FROM [dbo].[confirmations] a
                 inner join [dbo].waec_exams b
                 on a.diet_id = b.id
                 inner join [dbo].[offices] d
                 on a.office_id = d.id
                 where a.office_id = '#{params[:office_id]}' and IsVeriferResult = 1
                 order by a.[created_at] DESC

			  SQL

            @confirms = ActiveRecord::Base.connection.exec_query(sql)
        end  
   #        format.json { render json: @confirms }
   #      end
	   		respond_to do |format|
			format.html {}
			format.json { render json: @confirms }
		end
	end

  def SearchCandidateFromVerifier
   
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
      "321"=>"STATS",
     "328"=>"IGBO LANGUAGE",
     "329"=>"YORUBA LANGUAGE",
     "330"=>"EDO",
     "331"=>"EFIK",
     "165"=>"HAUSA LANG",
     "332"=>"IBIBIO",
     "401"=>"FURTHER MATHS",
     "402"=>"GENERAL MATHEMATICS",
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
     "722"=>"PHOTOGRAPHY"
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
"432"=>"PHYSICS",
"441"=>"CHEMISTRY",
"442"=>"CHEMISTRY", 
"451"=>"BIOLOGY",
"452"=>"BIOLOGY", 
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

subjectindex1 = {
"0"=>"ENGLISH LANGUAGE",
"3"=>"ADDITIONAL MATHEMATICS",
"H"=>"BIBLE KNOWLEDGE",
"K"=>"HISTORY",
"P"=>"ECONOMICS",
"X"=>"CHEMISTRY",
"F"=>"YORUBA",
"D"=>"HAUSA",
"G"=>"ENGLISH LITERATURE",
"Q"=>"MATHEMATICS",
"R"=>"MODERN MATHEMATICS",
"Y"=>"BIOLOGY",
"W"=>"PHYSICS",
"N"=>"GEOGRAPHY",
"4"=>"FRENCH",
"I"=>"BIBLE KNOWLEDGE",
"J"=>"ISLAMIC RELIGIOUS KNOWLEDGE",
"1"=>"ORAL ENGLISH",
"Z"=>"AGRICULTURAL SCIENCE"
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


   #@waec_confirmation = WaecConfirmation.find(params[:id])
   #@entry = WassceD2007.find_by_exam_no(@waec_confirmation.exam_no) 11631041
       ##{"CandNo"=>"4250304008", "dietId"=>"31"}
    @diet = nil
    params[:table_name] = nil
    @resultVals = []

    if  params[:dietId].present?
   
         sql = <<-SQL 
   
         SELECT [id]
         ,[exam_name]
         ,[exam_diet]
         ,[table_name]
         ,[centre_table_name]
         ,[pix_folder]
         ,[created_at]
         ,[consolidated]
         ,[waec_user_id]
         ,[exam_year]
         ,[isSingleDigit]
         ,[exam_title_name]
         ,[sub_exam_title_name]
         ,[exam_type_code]
     FROM [dbo].[waec_exams]
     where [id] = '#{params[:dietId]}'
   
         SQL
   
         @diet = WaecExam.connection.exec_query(sql)
           
         params[:table_name] = @diet[0]["table_name"]
   
        
    end
   
   
       

    if params[:CandNo].present? && params[:table_name].present?

      @resultVals =  WaecExam.find_by_sql ["SELECT * FROM dbo."+params[:table_name] +" WHERE exam_no = ? ", params[:CandNo] ]

    else

      @resultVals = []

    end

 # Checking Exam No length. for 10 and 8 length. 

   if params[:CandNo].length == 10   #@waec_confirmation.exam_no.length == 10
     ## Previous statement

            # Restoring Printing And Deco SubjectCode because of Clash with 1980 Account subj. Code

            subjectindex["721"] = "PAINTING & DECO"
      
            subjectindex["211"] =  "HAUSA LIT"

                a = @diet[0]["exam_diet"]
                b = a.split("-")
               @examYear = @diet[0]["exam_year"] ## b[0].strip[-4..-1]
#binding.pry
      @centre = WaecCentre.find_by_sql ["SELECT * FROM [dbo].[waec_centres] WHERE CentreCode = ? AND ExamYear = ? ", params[:CandNo][0,7] , @examYear]
           
   elsif params[:CandNo].length == 8

    a = @diet[0]["exam_diet"]
    b = a.split("-")
    @examYear = @diet[0]["exam_year"]#.strip ## b[0].strip[-4..-1]

     @centre = WaecCentre.find_by_sql ["SELECT * FROM [dbo].[waec_centres] WHERE CentreCode = ? AND ExamYear = ? ", params[:CandNo][0,5] , @examYear ]

   end


######  Decide Exam
if ( @diet[0]["exam_diet"].strip[0,6] == 'WASSCE')
examination =  "#{@diet[0]["exam_diet"]}"
else
examination =  "#{@diet[0]["exam_diet"]} #{@diet[0]["exam_name"]}"
end
   #@entry.exam_no[0,1] == '4' ?
  #"MAY / JUNE " + "2007" : " NOVEMBER / DECEMBER " + "2007"  


resultContainer = []
resultObjects = Hash.new
finalResult = []


subjectsContainer = Hash.new
resultsContainer = Hash.new
gradsInterpsContainer = Hash.new
suj = Hash.new
grd = Hash.new
grdNam = Hash.new


newResultObjects = Hash.new
resultComponents = []
newfinalResult = []


if @resultVals[0]["exam_no"].present?

  @confirmation_image = ConfirmationImage.where(dietId: params[:dietId], candNo: params[:CandNo])

  if @confirmation_image.length == 0
    newResultObjects['Picture'] = nil
  elsif 
    newResultObjects['Picture'] =  @confirmation_image[0]["base64"] 
  end
  
  
  #newResultObjects['centre'] = @centre
  newResultObjects['candNo'] = @resultVals[0]["exam_no"]
  newResultObjects['candName'] = @resultVals[0]["full_name"].strip
  newResultObjects['ExamTitle'] = examination
  newResultObjects['examYear'] = @examYear
  newResultObjects['formNo'] = @resultVals[0]["form_no"]
  newResultObjects['sex'] =  @resultVals[0]["sex"] =='1'? 'MALE' : 'FEMALE'
  newResultObjects['dob'] = @resultVals[0]["date_of_birth"]
  newResultObjects['dob2'] = @resultVals[0]["date_of_birth"] == nil ? "N/A" : @resultVals[0]["date_of_birth"][0,2] +"/"+ @resultVals[0]["date_of_birth"][2,2]+"/"+ @resultVals[0]["date_of_birth"][4,4] #@results[0]["dob"]


    if @centre.length == 0
      newResultObjects['CentreName'] = "N/A"
    elsif 
      newResultObjects['CentreName'] = @centre[0]["centre_name"] 
    end


    else

      @resultVals[0] = []
      
    end

      @resultVals[0]["results"]

      if @diet[0]["exam_name"].strip == "W.A.S.S.C.E." 

            @resultVals[0]["results"].strip.scan(/..../) do |x|

              resultComponents << x

           end  

           ## Set 402 based on the year

           if @examYear >= "2021"
            subjectindex["402"] = "GENERAL MATHEMATICS"
           else
            subjectindex["402"] = "MATHEMATICS"
           end


           resultComponents.each.with_index do |val,index| 
            
            # puts "index: #{index} for #{val}" 

            newResultObjects["Subject#{index+1}"] = subjectindex[val[0,3]]
            newResultObjects["Grade#{index+1}"] = gradeindex[val[-1,1]]
            newResultObjects["GradeInter#{index+1}"] = gradename[val[-1,1]] 
          
          end

          newfinalResult << newResultObjects
  

      elsif @diet[0]["exam_name"].strip == "S.S.C.E."        
                 subjectindex0["341"]="FURTHER MATHS"

              #    @entry.results.strip.scan(/..../) do |x|
              #    pdf.Cell(30,4,' ',0,0,'L')
              #    pdf.Cell(50,4,subjectindex0[x[0,3]],0,0,'L')
              #    pdf.Cell(30,4,gradeindex0[x[-1,1]],0,0,'C')
              #    pdf.Cell(35,4,'',0,0,'')
              #    pdf.Cell(0,4,gradename[x[-1,1]],0,1,'L')
              #  end  

              @resultVals[0]["results"].strip.scan(/..../) do |x|
                  resultComponents << x    
              end  
    
              resultComponents.each.with_index do |val,index|               
                  newResultObjects["Subject#{index+1}"] = subjectindex0[val[0,3]]
                  newResultObjects["Grade#{index+1}"] = gradeindex0[val[-1,1]]
                  newResultObjects["GradeInter#{index+1}"] = gradename[val[-1,1]] 
              end
    
              newfinalResult << newResultObjects


      elsif @diet[0]["exam_name"].strip == "W.A.S.C. O/L" || @diet[0]["exam_name"].strip == "GCE O/L" || @diet[0]["exam_name"].strip == "SC/GCE O/L"
                      subjectindex0["341"] = "ADDMATHS"

              #    @entry.results.strip.scan(/..../) do |x|
              #    pdf.Cell(30,4,' ',0,0,'L')
              #    pdf.Cell(50,4,subjectindex0[x[0,3]],0,0,'L')
              #    pdf.Cell(30,4,gradeindex0[x[-1,1]],0,0,'C')
              #    pdf.Cell(35,4,'',0,0,'')
              #    pdf.Cell(0,4,gradename[x[-1,1]],0,1,'L')
              #  end 

            @resultVals[0]["results"].strip.scan(/..../) do |x|
                resultComponents << x  
             end  
#binding.pry
            resultComponents.each.with_index do |val,index|   
                newResultObjects["Subject#{index+1}"] = subjectindex0[val[0,3]]
                newResultObjects["Grade#{index+1}"] = gradeindex0[val[-1,1]]
                newResultObjects["GradeInter#{index+1}"] = gradename[val[-1,1]]             
            end
  
            newfinalResult << newResultObjects


            else 

            #  @entry.results.strip.scan(/../) do |x|
            #      pdf.Cell(30,4,' ',0,0,'L')
            #      pdf.Cell(50,4,subjectindex1[x[0,1]],0,0,'L')
            #      pdf.Cell(30,4,gradeindex0[x[-1,1]],0,0,'C')
            #      pdf.Cell(35,4,'',0,0,'')
            #      pdf.Cell(0,4,gradename[x[-1,1]],0,1,'L')
            #    end

            @resultVals[0]["results"].strip.scan(/../) do |x|
                resultComponents << x  
            end  

            resultComponents.each.with_index do |val,index|   
              newResultObjects["Subject#{index+1}"] = subjectindex1[val[0,1]]
              newResultObjects["Grade#{index+1}"] = gradeindex0[val[-1,1]]
              newResultObjects["GradeInter#{index+1}"] = gradename[val[-1,1]] 
            end
  
            newfinalResult << newResultObjects
     
    end


   unless newfinalResult.nil? 
      
      finalResult = []
      resultsArray = []
      
    
      unless newResultObjects["Subject1"].nil?
      
        hash0 = {
                 :Subject=> newResultObjects["Subject1"], 
                 :Grade => newResultObjects["Grade1"],
                 :GradeInter => newResultObjects["GradeInter1"],
                 :candNo => newResultObjects["candNo"],
                 :candName => newResultObjects["candName"],
                 :examType => newResultObjects["ExamTitle"],
                 :examYear => newResultObjects["examYear"],
                 :formNo => newResultObjects["formNo"],
                 :sex => newResultObjects["sex"] ,
                 :dob =>newResultObjects["dob"],
                 :dob2 => newResultObjects["dob2"],
                 :CentreName => newResultObjects["CentreName"], 
                 :Picture => newResultObjects['Picture'],  
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"]           
       }
      
            resultsArray << hash0
      end
      
      unless newfinalResult[0]["Subject2"].nil?
      
        hash1 = {
                 :Subject=> newResultObjects["Subject2"], 
                 :Grade => newResultObjects["Grade2"],
                 :GradeInter => newResultObjects["GradeInter2"],
                 :candNo => newResultObjects["candNo"],
                 :candName => newResultObjects["candName"],
                 :examType => newResultObjects["ExamTitle"],
                 :examYear => newResultObjects["examYear"],
                 :formNo => newResultObjects["formNo"],
                 :sex => newResultObjects["sex"] ,
                 :dob =>newResultObjects["dob"],
                 :dob2 => newResultObjects["dob2"],
                 :CentreName => newResultObjects["CentreName"], 
                 :Picture => newResultObjects['Picture'],  
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"]           
       }
      
            resultsArray << hash1
      end
      
      unless newfinalResult[0]["Subject3"].nil?
      
        hash2 = {
                 :Subject=> newResultObjects["Subject3"], 
                 :Grade => newResultObjects["Grade3"],
                 :GradeInter => newResultObjects["GradeInter3"],
                 :candNo => newResultObjects["candNo"],
                 :candName => newResultObjects["candName"],
                 :examType => newResultObjects["ExamTitle"],
                 :examYear => newResultObjects["examYear"],
                 :formNo => newResultObjects["formNo"],
                 :sex => newResultObjects["sex"] ,
                 :dob =>newResultObjects["dob"],
                 :dob2 => newResultObjects["dob2"],
                 :CentreName => newResultObjects["CentreName"], 
                 :Picture => newResultObjects['Picture'],    
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"]           
       }
      
            resultsArray << hash2
      end
      
      unless newfinalResult[0]["Subject4"].nil?
       hash3 = {
                  :Subject=> newResultObjects["Subject4"], 
                  :Grade => newResultObjects["Grade4"],
                  :GradeInter => newResultObjects["GradeInter4"],
                  :candNo => newResultObjects["candNo"],
                  :candName => newResultObjects["candName"],
                  :examType => newResultObjects["ExamTitle"],
                  :examYear => newResultObjects["examYear"],
                  :formNo => newResultObjects["formNo"],
                  :sex => newResultObjects["sex"] ,
                  :dob =>newResultObjects["dob"],
                  :dob2 => newResultObjects["dob2"],
                  :CentreName => newResultObjects["CentreName"], 
                  :Picture => newResultObjects['Picture'],    
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"] 
                }
           resultsArray << hash3
      end
      
      unless newfinalResult[0]["Subject5"].nil?
       hash4 = {
                  :Subject=> newResultObjects["Subject5"], 
                  :Grade => newResultObjects["Grade5"],
                  :GradeInter => newResultObjects["GradeInter5"],
                  :candNo => newResultObjects["candNo"],
                  :candName => newResultObjects["candName"],
                  :examType => newResultObjects["ExamTitle"],
                  :examYear => newResultObjects["examYear"],
                  :formNo => newResultObjects["formNo"],
                  :sex => newResultObjects["sex"] ,
                  :dob =>newResultObjects["dob"],
                  :dob2 => newResultObjects["dob2"],
                  :CentreName => newResultObjects["CentreName"], 
                  :Picture => newResultObjects['Picture'],
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"]
             }
           resultsArray << hash4
      end
      
      unless newfinalResult[0]["Subject6"].nil?
       hash5 = {
                  :Subject=> newResultObjects["Subject6"], 
                  :Grade => newResultObjects["Grade6"],
                  :GradeInter => newResultObjects["GradeInter6"],
                  :candNo => newResultObjects["candNo"],
                  :candName => newResultObjects["candName"],
                  :examType => newResultObjects["ExamTitle"],
                  :examYear => newResultObjects["examYear"],
                  :formNo => newResultObjects["formNo"],
                  :sex => newResultObjects["sex"] ,
                  :dob =>newResultObjects["dob"],
                  :dob2 => newResultObjects["dob2"],
                  :CentreName => newResultObjects["CentreName"], 
                  :Picture => newResultObjects['Picture'], 
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"] 
        }
             resultsArray << hash5
      end
      
      unless newfinalResult[0]["Subject7"].nil?
       hash6 = {
                  :Subject=> newResultObjects["Subject7"], 
                  :Grade => newResultObjects["Grade7"],
                  :GradeInter => newResultObjects["GradeInter7"],
                  :candNo => newResultObjects["candNo"],
                  :candName => newResultObjects["candName"],
                  :examType => newResultObjects["ExamTitle"],
                  :examYear => newResultObjects["examYear"],
                  :formNo => newResultObjects["formNo"],
                  :sex => newResultObjects["sex"] ,
                  :dob =>newResultObjects["dob"],
                  :dob2 => newResultObjects["dob2"],
                  :CentreName => newResultObjects["CentreName"], 
                  :Picture => newResultObjects['Picture'], 
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"]  
              }
      
           resultsArray << hash6
      end
      unless newfinalResult[0]["Subject8"].nil?
       hash7 = {
                  :Subject=> newResultObjects["Subject8"], 
                  :Grade => newResultObjects["Grade8"],
                  :GradeInter => newResultObjects["GradeInter8"],
                  :candNo => newResultObjects["candNo"],
                  :candName => newResultObjects["candName"],
                  :examType => newResultObjects["ExamTitle"],
                  :examYear => newResultObjects["examYear"],
                  :formNo => newResultObjects["formNo"],
                  :sex => newResultObjects["sex"] ,
                  :dob =>newResultObjects["dob"],
                  :dob2 => newResultObjects["dob2"],
                  :CentreName => newResultObjects["CentreName"], 
                  :Picture => newResultObjects['Picture'],
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"] 
               }
         resultsArray << hash7
      end
      
      unless newfinalResult[0]["Subject9"].nil?
       hash8 = {
                  :Subject=> newResultObjects["Subject9"], 
                  :Grade => newResultObjects["Grade9"],
                  :GradeInter => newResultObjects["GradeInter9"],
                  :candNo => newResultObjects["candNo"],
                  :candName => newResultObjects["candName"],
                  :examType => newResultObjects["ExamTitle"],
                  :examYear => newResultObjects["examYear"],
                  :formNo => newResultObjects["formNo"],
                  :sex => newResultObjects["sex"] ,
                  :dob =>newResultObjects["dob"],
                  :dob2 => newResultObjects["dob2"],
                  :CentreName => newResultObjects["CentreName"], 
                  :Picture => newResultObjects['Picture'],  
                #  :CertificateStatus =>  @resultVals[0]["CertificateStatus"],  
                #  :DatePrinted => @resultVals[0]["DatePrinted"]  
              }
         resultsArray << hash8
      
      end
      
      resultsArray[0][:NoOfSubjects] =  resultsArray.length   
      

      newfinalResult << resultsArray
      
      ## Implementing Json Result format
           
      confirmResult_Json = {}

           if params[:confirmID].present? && resultsArray.length > 0
      
            # subjectsGrade = []
            # resultComponent = {}

            @confirmation = Confirmation.find(params[:confirmID])
      
            #  resultsArray.each do |result|
            #   resultComponent = {
            #     "subject": result[:Subject],
            #     "grade": result[:Grade],
            #     "intrepretation": result[:GradeInter]
            #   }
      
            #   subjectsGrade << resultComponent
              
            #  end
      
            #  candidateType = @diet[0]["exam_type_code"] =='j'? 'School Candidate' : 'Private Candidate'

            #   #issuedDate = Date.parse(DateTime.current).strftime("%B %e, %Y") # DateTime.current.strptime("%d/%m/%Y")
            #   issuedDate = ActiveSupport::TimeZone["Central Time (US & Canada)"].parse(DateTime.current.to_s).utc.to_date.strftime("%d/%m/%Y")
           
            #  confirmResult_Json = {
            #    "WAECRefNumber": @confirmation.ref_no,
            #    "WesRefNumber": @confirmation.WES_Ref,        
            #    "examName":   resultsArray[0][:examType],
            #    "examYear": resultsArray[0][:examYear].to_s,
            #    "candidateNumber": @confirmation.exam_no,
            #    "candidateType": candidateType,
            #    "candidateName": resultsArray[0][:candName],
            #    "sex": resultsArray[0][:sex],
            #    "dateOfBirth": resultsArray[0][:dob2],
            #    "noOfSubjects": resultsArray.length.to_s,
            #    "issuedate": issuedDate, #"17/03/2023",
            #    "country": "Nigeria",
            #    "subjectsData": subjectsGrade
            #  }


            @resultsArray = resultsArray
            confirmResult_Json = JsonResultCreator.new(resultsArray, @confirmation, @diet).call

            #binding.pry

            #  Saving:
      
            cookies[:my_data] = { 
              :value => confirmResult_Json.to_json, 
              :expires => 4.years.from_now
            }
            # Reading:
      
            my_object = JSON.parse(cookies[:my_data])
           
        
           end
      
          #binding.pry
      
      end
      
       respond_to do |format|
      
         if newfinalResult.empty?
               format.html { render :new }
               format.json { render json: {success: false, message: "Candidate's Result is not available" }}
         else
               format.html {}
               format.json { render json: {success: true, results: newfinalResult} }
         end
       end

 end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_waec_exam
      @waec_exam = WaecExam.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def waec_exam_params
      params.require(:waec_exam).permit(:exam_name, :exam_diet, :table_name, :centre_table_name, :pix_folder)
    end
end

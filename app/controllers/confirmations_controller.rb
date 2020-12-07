class ConfirmationsController < ApplicationController
	before_action :authenticate_user!
	#before_action :set_confirmation, only: [:show, :edit, :update, :destroy]
		load_and_authorize_resource
		

	def index

		params[:office_id] = current_user.office_id
		
		if current_user.audit_role?
		#@confirms = Confirmation.all.paginate(:page => params[:page], :per_page => 10).order("created_at DESC")

		             sql = <<-SQL 

				  SELECT  
					a.[id] ,a.[user_id] ,b.[DietName], c.[YearName], a.[ref_no],a.[exam_no]
			      ,a.[Cand_address] ,a.[dest_title] ,a.[dest_address1] ,a.[dest_address2]
			      ,a.[dest_location] ,a.[dest_email] ,a.[created_at] ,a.[updated_at] ,d.[office_name] ,a.[receipt_no], a.[WES_Ref]
				  FROM [verifierApp].[dbo].[confirmations] a
				  inner join [verifierApp].[dbo].[Diets] b
				  on a.diet_id = b.id
				  inner join [verifierApp].[dbo].[Years] c
				  on a.year_id = c.id
				  inner join [verifierApp].[dbo].[offices] d
				  on a.office_id = d.id
				  order by a.[created_at] DESC

			  SQL

            @confirms = ActiveRecord::Base.connection.exec_query(sql)


	    else
		#@confirms = Confirmation.where(:office_id => current_user.office_id).paginate(:page => params[:page], :per_page => 10).order("created_at DESC")
		#@confirms = Confirmation.where(:ref_no[0,11] => current_user.office_id).order("created_at DESC")
		 # respond_to do |format|

             sql = <<-SQL 

				  SELECT  
					a.[id] ,a.[user_id] ,b.[DietName], c.[YearName], a.[ref_no],a.[exam_no]
			      ,a.[Cand_address] ,a.[dest_title] ,a.[dest_address1] ,a.[dest_address2]
			      ,a.[dest_location] ,a.[dest_email] ,a.[created_at] ,a.[updated_at] ,d.[office_name] ,a.[receipt_no], a.[WES_Ref]
				  FROM [verifierApp].[dbo].[confirmations] a
				  inner join [verifierApp].[dbo].[Diets] b
				  on a.diet_id = b.id
				  inner join [verifierApp].[dbo].[Years] c
				  on a.year_id = c.id
				  inner join [verifierApp].[dbo].[offices] d
				  on a.office_id = d.id
				  where a.office_id = '#{params[:office_id]}'
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
	

	def new
		@confirm = Confirmation.new
	end

	def create
		# byebug
		#@user = User.find_by(params[:id])
		#if @user == current_user
		 if params[:DietName].present? && params[:YearName]

            @year = Year.find_by(:YearName => params[:YearName])
            params[:year_id] = @year.id

            @diet = Diet.find_by(:DietName => params[:DietName])
            params[:diet_id] = @diet.id

         end

		 @confirm = current_user.confirmations.create(confirmation_params)
 			
			respond_to do |format|

				if @confirm.save 

					@confirm.update(:year_id => params[:year_id], :diet_id => params[:diet_id] )


					if @confirm.exam_no[0,1]=='5'
				        @global_table = WaecPrivateExam.create(confirmation_id: @confirm.id)

          				else

				        @global_table = WaecSchoolExam.create(confirmation_id: @confirm.id)
				    end    

          			 if params[:receiptID] 

          			 	params[:office_id] = current_user.office_id

			           	@receipt_status = ReceiptStatus.find_by(:id => params[:receiptID])

			           	@receipt_status.update(confirmation_id: @confirm.id )
			            @receipt_status.update(status: 'USED')
			           

          			 end

          			 if params[:paymentID] 

			           	@payPrinted = Payment.find_by(:id => params[:paymentID])

			            @payPrinted.update(printed: true)

          			 end


				    if @global_table.save
				#      raise params.inspect
				        ###########  Extract Reference Number

				        #@serial = 100000000 + @global_table.id
				         @serial_no = 100000000 + @global_table.id
				       # @serial_no= @serial.to_s

				        #@my_reference = "L/CR/CONF/" + @waec_confirmation.exam_no[0,1]+ '259' +@serial_no.to_s[1,8]
				        officeID = @confirm.user.office.id.to_s
				        if  (officeID.length) == 1
				        	 officeID = '0'+ officeID
				        else
				        	 officeID
				        end

				        @my_reference = "L/CR/CONF/" + @confirm.exam_no[0,1].to_s + officeID.to_s + @serial_no.to_s[1,8]

				         #@my_reference = "L/CR/CONF/" + @confirm.exam_no[0,1].to_s + @confirm.user.office.id.to_s + @serial_no.to_s[1,8]
				        
				        # @my_reference = "L/CR/CONF/" + "#{@confirm.exam_no[0,1]}" + "#{@confirm.user.office.id}" +  "#{@serial_no[1,8]} "
				        #@my_reference = "L/CR/CONF/" + @confirm.exam_no[0,1] + @confirm.user.office.id + @serial_no[1,8]
				        @confirm.update(:ref_no => @my_reference)
				        @confirm.update(:office_id => @confirm.user.office_id)

				    end



				
					head :ok

					#format.html {}
			        format.json {}
			        #render json: {status: 'SUCCESS', message: 'saved Confirmation', data: @confirm}, status: :ok

				end
			end
		end
	#end

	def show

		#if params[:id]

			sql = <<-SQL 

				SELECT
                              a.[id] ,a.[user_id] ,b.[DietName], c.[YearName], a.[ref_no],a.[exam_no]
                              ,a.[Cand_address] ,a.[dest_title] ,a.[dest_address1] ,a.[dest_address2]
                              ,a.[dest_location] ,a.[dest_email] ,a.[created_at] ,a.[updated_at] ,d.[office_name] ,a.[receipt_no], a.[WES_Ref]
							  ,e.[CandName] ,e.[cand_email]
                                  FROM [verifierApp].[dbo].[confirmations] a
                                  inner join [verifierApp].[dbo].[Diets] b
                                  on a.diet_id = b.id
                                  inner join [verifierApp].[dbo].[Years] c
                                  on a.year_id = c.id
                                  inner join [verifierApp].[dbo].[offices] d
                                  on a.office_id = d.id
								  inner join [verifierApp].[dbo].[payments] e
								  on a.payment_id = e.id
				  where a.[id] = '#{params[:id]}'
				  order by a.[created_at] DESC

			  SQL

            @confirm = ActiveRecord::Base.connection.exec_query(sql)
			#binding.pry
		#end
		
		respond_to do |format|
          format.html {}
          format.json { render json: @confirm }
        end
	end


#	def create
#   @waec_confirmation = WaecConfirmation.new(params[:waec_confirmation])
#    if @waec_confirmation.save
#      if @waec_confirmation.exam_no[0,1]=='5'
#        @global_table = WaecPrivateExam.new
#      else
#        @global_table = WaecSchoolExam.new
#      end
#      @global_table.waec_confirmation_id = @waec_confirmation.id
#      if @global_table.save
##      raise params.inspect
#        ###########  Extract Reference Number
#        @serial_no = 100000000 + @global_table.id
#        #@my_reference = "L/CR/CONF/" + @waec_confirmation.exam_no[0,1]+ '259' +@serial_no.to_s[1,8]
#        @my_reference = "L/CR/CONF/" + @waec_confirmation.exam_no[0,1]+ @waec_confirmation.waec_user.waec_office.office_code + @serial_no.to_s[1,8]
#        @waec_confirmation.update_attribute(:ref_no, @my_reference)
#      end
#      flash[:notice] = 'WaecConfirmation was successfully created.'
#      redirect_to :action => 'show', :id => @waec_confirmation
#    else
#      render :action => 'new'
#    end
#  end


  # PATCH/PUT /documents/1
  # PATCH/PUT /documents/1.json
  def update
  	 @confirm = Confirmation.find(params[:id]) 
    respond_to do |format|
      if @confirm.update(confirmation_params)
       
        format.json { render json: @confirm }
      else
        
        format.json { render json: @confirm.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /documents/1
  # DELETE /documents/1.json
  def destroy
  	 @confirm = Confirmation.find(params[:id]) 
    @confirm.destroy
    respond_to do |format|
      format.html { redirect_to documents_url, notice: 'Confirmation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


	private

	def set_confirmation
      @confirm = Confirmation.find(params[:id]) 
    end

	def confirmation_params
		params.require(:confirmation).permit(:user_id,:diet_id,:year_id,:ref_no,:exam_no,:Cand_address,:dest_title,
						:dest_address1,:dest_address2,:dest_location,:dest_email, :confirm_type_id, :confirm_country_id,
						:receipt_no, :WES_Ref, :payment_id)
	end

	protected
	def set_default_response_format
	  request.format = :json unless params[:format]
	end
end

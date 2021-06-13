class OfficesController < ApplicationController
	#before_action :authenticate_user!
  def index

    if current_user.nil?
        @offices= Office.all.order(office_name: :asc)

    elsif current_user.present? && current_user.role.name == "admin"
         @offices= Office.all.order(office_name: :asc)

    elsif current_user.present? && current_user.role.name == "audit_staff"
         @zonal = WaecZonalOffice.find_by(:office_id => current_user.office_id)
         unless @zonal.nil?
             @offices = Office.where(waec_zonal_office_id: @zonal.id)
         else
            singleOffice = []
            singleOffice << Office.find_by(id: current_user.office_id)
            @offices  = singleOffice
         end
        
    end
  	# @offices= Office.all.order(office_name: :asc)

  	render json: @offices
  end
end

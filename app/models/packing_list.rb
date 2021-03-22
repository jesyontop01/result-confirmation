class PackingList < ActiveRecord::Base
	mount_uploader :attachment, AttachmentUploader # Tells rails to use this uploader for this model.   
    #validates :waec_office_id, presence: true # Make sure the owner's name is present.
    belongs_to :waec_office

    STATES =  %w{ ABIA ABUJA ADAMAWA AKWA-IBOM ANAMBRA BAUCHI BAYELSA BENUE BORNO CROSS-RIVERS
				  DELTA EBONYI EDO EKITI ENUGU GOMBE IMO JIGAWA KADUNA KANO KATSINA KEBBI KOGI
				  KWARA LAGOS NASSARAWA NIGER OGUN ONDO OSUN OYO PLATEAU RIVERS SOKOTO TARABA
				  YOBE ZAMFARA OFFSHORE PACKING_LIST_BACKUP }
				  
end

class DashboardController < ApplicationController
	#before_action :authenticate_user!, except: [:index]
	before_action :authenticate_user!, :except => [:index]
  def index
  end
end

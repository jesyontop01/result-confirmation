class VerifiersController < ApplicationController
   before_action :authenticate_user!
  def index
  	 @exams = Exam.all.order(exam_diet: :desc)
  	  respond_to do |format|
		format.html {}
		format.json { render json: @exams }
		end

  end

  def new
  end

  def edit
  end

  
end
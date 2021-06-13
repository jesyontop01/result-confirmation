class SendEmailJob < ApplicationJob
  queue_as :default

  # def perform(*args)
  #   # Do something later
  # end

  def perform(user)
    @user = user
     UserMailer.activation_request(@user).deliver_later
  end
end



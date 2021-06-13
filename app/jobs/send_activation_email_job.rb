class SendActivationEmailJob < ApplicationJob
  queue_as :default

  # def perform(*args)
  #   # Do something later
  # end
  def perform(user)
    @user = user
    UserMailer.welcome(@user).deliver_later
  end
end


# class SendEmailJob < ApplicationJob
#   queue_as :default


#   def perform(user)
#     @user = user
#      UserMailer.activation_request(@user).deliver_later
#   end
# end


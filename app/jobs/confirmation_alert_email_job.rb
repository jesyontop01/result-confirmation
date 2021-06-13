class ConfirmationAlertEmailJob < ApplicationJob
  queue_as :default

  # def perform(*args)
  #   # Do something later
  # end
  def perform(confirm)
   @confirm = confirm
    UserMailer.confirmation_create(@confirm).deliver_later
  end

end

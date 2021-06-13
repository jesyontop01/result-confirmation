class PaymentReceiptEmailJob < ApplicationJob
  queue_as :default

  # def perform(*args)
  #   # Do something later
  # end
  def perform(payment)
    @payment = payment
    UserMailer.payment_receipt(@payment).deliver_later
  end

end

class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.activation_request.subject
  #
  default from: "confirmation@waec.org.ng"

  def activation_request(user)
    @user = user
# User.find(user[0]["id"]).role? :admin
    mail(from: "confirmation@waec.org.ng", to: User.where(admin: true).pluck(:email), subject: "Activation Request ")

  end

  def welcome(user)
    @user = user

    mail(from: "confirmation@waec.org.ng", to: @user.email, subject: "Online Confirmation Account Activation ")
  end

  def payment_receipt(payment)
     @payment = payment
     ##User.where(admin: true).pluck(:email)
    mail(from: "confirmation@waec.org.ng", to: @payment.cand_email, subject: "Online Confirmation Payment Receipt")
  end

  def confirmation_create(confirm)
     @confirm = confirm

    mail(from: "confirmation@waec.org.ng", to: @confirm.dest_email, subject: "Online Confirmation Creation Alert")
  end


end

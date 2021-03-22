class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.activation_request.subject
  #
  def activation_request(user)
    @user = user
# User.find(user[0]["id"]).role? :admin
    mail(to: User.where(admin: true).pluck(:email), subject: "Activation Request ")

  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.welcome.subject
  #
  def welcome(user)
    @user = user

    mail(to: @user.email, subject: "Online Confirmation Account Activation ")
  end
end

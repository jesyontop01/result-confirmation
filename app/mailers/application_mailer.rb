class ApplicationMailer < ActionMailer::Base
  default from: "confirmation@waec.org.ng"
  layout 'mailer'
end


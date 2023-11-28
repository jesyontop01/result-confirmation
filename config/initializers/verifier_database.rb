# in config/initializers/verifier_database.rb
# VERIFIER_DB = ActiveRecord::Base.configurations["reporting_#{Rails.env}"]

VERIFIER_DB = ActiveRecord::Base.configurations["#{Rails.env}_sec"].to_s
##web: bundle exec rails server -p $PORT
web: bundle exec rails server -e production -p 3000
worker:  bundle exec rake jobs:work
worker: RAILS_ENV=production script/delayed_job start
worker: RAILS_ENV=production script/delayed_job stop

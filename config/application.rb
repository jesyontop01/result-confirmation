require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Verifier
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

          #config/application.rb
    config.assets.paths << Rails.root.join(* %w(vendor assets bower_components))

    config.assets.paths << Rails.root.join("public", "Images", "Pix", "mjall")
    config.assets.paths << Rails.root.join("public", "Images", "Pix", "ndall")

        config.assets.paths << Rails.root.join('node_modules')
    config.serve_static_files = true
    config.assets.paths << Rails.root.join('app', 'assets', 'bower_components')

    # config/application.rb
config.assets.paths << Rails.root.join(* %w(vendor assets bower_components))
    config.assets.precompile << %w( *.scss *.js )
    config.assets.initialize_on_precompile = true
    config.assets.precompile = ['*.js', '*.scss', '*.png',' *.gif', '*.jpg', '*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']

# We don't want the default of everything that isn't js or css, because it pulls too many things in
#config.assets.precompile.shift

# Explicitly register the extensions we are interested in compiling
config.assets.precompile.push(Proc.new do |path|
  File.extname(path).in? [
    '.html', '.erb', '.haml', '.js',                # Templates
    '.png',  '.gif', '.jpg', '.jpeg', '.svg', # Images
    '.eot',  '.otf', '.svc', '.woff', '.woff2', '.ttf', # Fonts
  ]
end)

 config.active_job.queue_adapter = :delayed_job

Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components', 'admin-lte')
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components', 'admin-lte', 'skins')
Rails.application.config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/





     #config.active_record.schema_format = :sql
  end
end

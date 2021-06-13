# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

 #config/initializers/assets.rb
types = %w( *.png *.gif *.jpg *.eot *.woff *.ttf )
Rails.application.config.assets.precompile += types

# We need to add also subpaths admin-lte and admin-lte/skins since there is
# relative reference for bootstrap in skins less files
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components', 'admin-lte')
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components', 'admin-lte', 'skins')
Rails.application.config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/
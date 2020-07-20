class AddIsSignedInToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :is_signedIn, :integer, default: 0
  end
end

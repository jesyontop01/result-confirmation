class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string
    add_column :users, :surname, :string
    add_column :users, :othernames, :string
    add_column :users, :title, :string
    add_reference :users, :office, foreign_key: true
    add_column :users, :is_management, :boolean, default: false
  end
end

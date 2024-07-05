# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: true, default: ""
      t.string :name,               null: true, default: ""
      t.string :encrypted_password, null: true, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      t.string :google_id
      t.string :auth_token
      t.string :fresh_token
      t.string :accessPin,           null: false, default: "free"

      t.timestamps null: false
    end

    add_index :users, :auth_token,           unique: true
    add_index :users, :fresh_token,           unique: true
    add_index :users, :google_id,            unique: true
    add_index :users, :name,                 unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end

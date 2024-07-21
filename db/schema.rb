# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_19_165945) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: :cascade do |t|
    t.integer "idea_id"
    t.string "alertMembers"
    t.string "url"
    t.text "description"
    t.integer "user_id"
    t.string "seenBy"
    t.string "alertType"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "idea_id", null: false
    t.bigint "user_id", null: false
    t.text "reactions"
    t.text "body"
    t.boolean "approved"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["idea_id"], name: "index_comments_on_idea_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "experts", force: :cascade do |t|
    t.string "name"
    t.string "link"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ideas", force: :cascade do |t|
    t.string "uuid"
    t.string "spinOffFrom"
    t.text "likes"
    t.text "description"
    t.text "attachments"
    t.text "videos"
    t.boolean "public", default: false
    t.boolean "monetized", default: false
    t.text "titles"
    t.text "tags"
    t.text "scripts"
    t.text "transactions"
    t.string "userID"
    t.integer "fundingAmount", default: 100
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_ideas_on_user_id"
  end

  create_table "libraries", force: :cascade do |t|
    t.string "title"
    t.string "creator"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "niches", force: :cascade do |t|
    t.string "title"
    t.text "keywords"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "replies", force: :cascade do |t|
    t.bigint "comment_id", null: false
    t.bigint "user_id", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_replies_on_comment_id"
    t.index ["user_id"], name: "index_replies_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: ""
    t.string "name", default: ""
    t.string "encrypted_password", default: ""
    t.string "uuid", default: ""
    t.string "stripeCustomerID", default: ""
    t.string "stripeAccountID", default: ""
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "proofOfSales"
    t.string "google_id"
    t.string "auth_token"
    t.string "fresh_token"
    t.string "accessPin", default: "free", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true
    t.index ["fresh_token"], name: "index_users_on_fresh_token", unique: true
    t.index ["google_id"], name: "index_users_on_google_id", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uuid"], name: "index_users_on_uuid", unique: true
  end

  add_foreign_key "comments", "ideas"
  add_foreign_key "comments", "users"
  add_foreign_key "ideas", "users"
  add_foreign_key "replies", "comments"
  add_foreign_key "replies", "users"
end

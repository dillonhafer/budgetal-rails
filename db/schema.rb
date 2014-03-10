# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140306011622) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "allocation_plan_budget_items", force: true do |t|
    t.integer  "allocation_plan_id"
    t.integer  "budget_item_id"
    t.decimal  "amount_budgeted",    precision: 10, scale: 2
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "allocation_plans", force: true do |t|
    t.integer  "budget_id"
    t.date     "start_date"
    t.date     "end_date"
    t.decimal  "income",     precision: 10, scale: 2
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "budget_categories", force: true do |t|
    t.integer  "budget_id"
    t.string   "name"
    t.string   "percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "budget_item_expenses", force: true do |t|
    t.integer  "budget_item_id"
    t.string   "name"
    t.decimal  "amount",         precision: 10, scale: 2
    t.date     "date"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "budget_items", force: true do |t|
    t.integer  "budget_category_id"
    t.string   "name"
    t.decimal  "amount_budgeted",    precision: 10, scale: 2
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.boolean  "envelope"
  end

  create_table "budgets", force: true do |t|
    t.string   "month"
    t.decimal  "monthly_income", precision: 10, scale: 2
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "user_id"
    t.string   "year"
  end

  create_table "users", force: true do |t|
    t.string   "password_hash"
    t.string   "password_salt"
    t.boolean  "admin"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end

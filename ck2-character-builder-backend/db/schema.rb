# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_11_090437) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_attributes", force: :cascade do |t|
    t.integer "character_id"
    t.integer "diplomacy"
    t.integer "martial"
    t.integer "stewardship"
    t.integer "intrigue"
    t.integer "learning"
    t.float "health"
    t.integer "fertility"
    t.integer "sons"
    t.integer "daughters"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "dynasty"
    t.boolean "marriage_status"
    t.string "culture"
    t.string "religion"
    t.string "sex"
  end

  create_table "traits", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "cost"
    t.string "group"
    t.string "type"
  end

end

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

ActiveRecord::Schema.define(version: 2020_01_29_024705) do

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

  create_table "character_traits", force: :cascade do |t|
    t.integer "character_id"
    t.integer "trait_id"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name", null: false
    t.string "dynasty", null: false
    t.boolean "marriage_status"
    t.string "culture"
    t.string "religion"
    t.string "sex"
    t.integer "education_id"
    t.datetime "created_at", precision: 6
    t.datetime "updated_at", precision: 6
  end

  create_table "traits", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "cost"
    t.string "type"
    t.json "effects", default: {}
    t.json "opposites", default: []
  end

end

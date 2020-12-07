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

ActiveRecord::Schema.define(version: 2020_12_07_165604) do

  create_table "Grade", primary_key: "GradeType", id: :string, limit: 1, default: nil, force: :cascade do |t|
    t.string "GradeValue", limit: 2, null: false
    t.string "GradeDesc", limit: 15, null: false
  end

  create_table "WaecOffices", force: :cascade do |t|
    t.varchar "State_Name", limit: 255
    t.varchar "State_Code", limit: 2, null: false
    t.varchar "OfficeAddress", limit: 200
    t.varchar "State_Head", limit: 50
    t.decimal "GPSLong", precision: 9, scale: 6
    t.decimal "GPSLat", precision: 9, scale: 6
  end

  create_table "assignments", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_assignments_on_role_id"
    t.index ["user_id"], name: "index_assignments_on_user_id"
  end

  create_table "confirm_amounts", force: :cascade do |t|
    t.bigint "confirm_type_id"
    t.decimal "amount", precision: 18, scale: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirm_type_id"], name: "index_confirm_amounts_on_confirm_type_id"
  end

  create_table "confirm_countries", force: :cascade do |t|
    t.bigint "confirm_type_id"
    t.string "countryName"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirm_type_id"], name: "index_confirm_countries_on_confirm_type_id"
  end

  create_table "confirm_types", force: :cascade do |t|
    t.string "typeName"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "confirmations", force: :cascade do |t|
    t.integer "user_id"
    t.integer "diet_id"
    t.integer "year_id"
    t.string "ref_no", limit: 255
    t.string "exam_no", limit: 255
    t.string "Cand_address", limit: 255
    t.string "dest_title", limit: 255
    t.string "dest_address1", limit: 255
    t.string "dest_address2", limit: 255
    t.string "dest_location", limit: 255
    t.string "dest_email", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "office_id"
    t.bigint "confirm_type_id"
    t.bigint "confirm_country_id"
    t.string "receipt_no", null: false
    t.string "WES_Ref"
    t.bigint "payment_id"
    t.index ["confirm_country_id"], name: "index_confirmations_on_confirm_countries_id"
    t.index ["confirm_type_id"], name: "index_confirmations_on_confirm_type_id"
    t.index ["diet_id"], name: "index_confirmations_on_dietTbl_id"
    t.index ["payment_id"], name: "index_confirmations_on_payment_id"
    t.index ["user_id"], name: "index_confirmations_on_user_id"
    t.index ["year_id"], name: "index_confirmations_on_yearTbl_id"
  end

  create_table "diets", force: :cascade do |t|
    t.varchar "DietName", limit: 50
  end

  create_table "exams", force: :cascade do |t|
    t.string "exam_name", limit: 255
    t.string "exam_diet", limit: 255
    t.string "table_name", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "model_name1", limit: 255
    t.string "view_name1", limit: 255
    t.string "subjectYear", limit: 255
  end

  create_table "offices", id: :bigint, default: nil, force: :cascade do |t|
    t.nchar "office_name", limit: 255
    t.nchar "office_state", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "packing_lists", force: :cascade do |t|
    t.string "office"
    t.string "attachment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "diet_id"
    t.bigint "year_id"
    t.string "exam_no"
    t.bigint "confirm_type_id"
    t.decimal "amount", precision: 18, scale: 0
    t.string "receipt_no"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cand_email"
    t.bigint "user_id"
    t.bigint "office_id"
    t.boolean "printed", default: false
    t.string "CandName"
    t.string "PhoneNo"
    t.bigint "transaction_type_id"
    t.bigint "receipt_status_id"
    t.index ["confirm_type_id"], name: "index_payments_on_confirm_type_id"
    t.index ["diet_id"], name: "index_payments_on_diet_id"
    t.index ["office_id"], name: "index_payments_on_office_id"
    t.index ["receipt_status_id"], name: "index_payments_on_receipt_status_id"
    t.index ["transaction_type_id"], name: "index_payments_on_transaction_type_id"
    t.index ["user_id"], name: "index_payments_on_user_id"
    t.index ["year_id"], name: "index_payments_on_year_id"
  end

  create_table "receipt_booklets", force: :cascade do |t|
    t.integer "rangeFrom"
    t.integer "rangeTo"
    t.bigint "office_id"
    t.bigint "user_id"
    t.string "status", default: "OPEN"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_receipt_booklets_on_office_id"
    t.index ["user_id"], name: "index_receipt_booklets_on_user_id"
  end

  create_table "receipt_corrections", force: :cascade do |t|
    t.bigint "receipt_status_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receipt_status_id"], name: "index_receipt_corrections_on_receipt_status_id"
    t.index ["user_id"], name: "index_receipt_corrections_on_user_id"
  end

  create_table "receipt_statuses", force: :cascade do |t|
    t.bigint "receipt_booklet_id"
    t.integer "receiptNo"
    t.string "status", default: "UNUSED"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "confirmation_id"
    t.index ["confirmation_id"], name: "index_receipt_statuses_on_confirmation_id"
    t.index ["receiptNo"], name: "index_receipt_statuses_on_receiptNo", unique: true
    t.index ["receipt_booklet_id"], name: "index_receipt_statuses_on_receipt_booklet_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schools", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "searches", force: :cascade do |t|
    t.string "keywords"
    t.bigint "office_id"
    t.bigint "confirm_type_id"
    t.integer "year"
    t.integer "month"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirm_type_id"], name: "index_searches_on_confirm_type_id"
    t.index ["office_id"], name: "index_searches_on_office_id"
  end

  create_table "sexes", force: :cascade do |t|
    t.string "sex_code", limit: 255
    t.string "sex_name", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "staffs", force: :cascade do |t|
    t.string "name", limit: 255
    t.string "department", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subjects", force: :cascade do |t|
    t.string "SubjectCode", limit: 255
    t.string "ExamYear", limit: 255
    t.string "ShortName", limit: 255
    t.string "LongName", limit: 255
    t.string "ResultName", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subjects_2010", force: :cascade do |t|
    t.string "SubjectCode", limit: 255
    t.string "ExamYear", limit: 255
    t.string "ShortName", limit: 255
    t.string "LongName", limit: 255
    t.string "ResultName", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sysdiagrams", primary_key: "diagram_id", id: :integer, force: :cascade do |t|
    t.string "name", limit: 128, null: false
    t.integer "principal_id", null: false
    t.integer "version"
    t.binary "definition"
    t.index ["principal_id", "name"], name: "UK_principal_name", unique: true
  end

  create_table "test_results", force: :cascade do |t|
    t.text "Picture"
    t.string "ExamDiet"
    t.string "ExamYear"
    t.string "CandNo"
    t.string "CandName"
    t.string "Sex"
    t.string "DOB"
    t.string "CentreName"
    t.string "Subject1"
    t.string "Grade1"
    t.string "Subject2"
    t.string "Grade2"
    t.string "Subject3"
    t.string "Grade3"
    t.string "Subject4"
    t.string "Grade4"
    t.string "Subject5"
    t.string "Grade5"
    t.string "Subject6"
    t.string "Grade6"
    t.string "Subject7"
    t.string "Grade7"
    t.string "Subject8"
    t.string "Grade8"
    t.string "Subject9"
    t.string "Grade9"
    t.integer "NoOfSubjects"
    t.integer "yearId"
    t.integer "dietId"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transaction_types", force: :cascade do |t|
    t.string "transName"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", limit: 255, default: "", null: false
    t.string "encrypted_password", limit: 255, default: "", null: false
    t.string "reset_password_token", limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip", limit: 255
    t.string "last_sign_in_ip", limit: 255
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", limit: 255
    t.string "surname", limit: 255
    t.string "othernames", limit: 255
    t.string "title", limit: 255
    t.integer "office_id"
    t.boolean "is_management", default: false
    t.integer "lp_no"
    t.boolean "admin", default: false
    t.boolean "activated", default: false
    t.datetime "activated_at"
    t.boolean "logged_in", default: false
    t.integer "is_signedIn", default: 0
    t.boolean "superadmin_role", default: false
    t.boolean "audit_role", default: false
    t.boolean "user_role", default: true
    t.string "permission", default: "user"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, where: "([reset_password_token] IS NOT NULL)"
  end

  create_table "waec_private_exams", force: :cascade do |t|
    t.integer "confirmation_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["confirmation_id"], name: "index_waec_private_exams_on_confirmation_id"
  end

  create_table "waec_school_exams", force: :cascade do |t|
    t.integer "confirmation_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["confirmation_id"], name: "index_waec_school_exams_on_confirmation_id"
  end

  create_table "wassce_d2008s", force: :cascade do |t|
    t.string "record_type", limit: 255
    t.string "exam_no", limit: 255
    t.string "sex", limit: 255
    t.string "disability", limit: 255
    t.string "date_of_birth", limit: 255
    t.string "full_name", limit: 255
    t.string "results", limit: 255
    t.string "form_no", limit: 255
    t.string "security_digit", limit: 255
    t.string "release_batch", limit: 255
    t.string "award", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["exam_no"], name: "index_wassce_d2008s_on_exam_no", unique: true
  end

  create_table "web_services", force: :cascade do |t|
    t.string "clientName"
    t.string "clientURL"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "years", force: :cascade do |t|
    t.varchar "YearName", limit: 5
  end

  add_foreign_key "assignments", "roles"
  add_foreign_key "assignments", "users"
  add_foreign_key "confirm_amounts", "confirm_types"
  add_foreign_key "confirm_countries", "confirm_types"
  add_foreign_key "confirmations", "confirm_countries"
  add_foreign_key "confirmations", "confirm_types"
  add_foreign_key "confirmations", "payments"
  add_foreign_key "payments", "confirm_types"
  add_foreign_key "payments", "diets"
  add_foreign_key "payments", "offices"
  add_foreign_key "payments", "receipt_statuses"
  add_foreign_key "payments", "transaction_types"
  add_foreign_key "payments", "users"
  add_foreign_key "payments", "years"
  add_foreign_key "receipt_booklets", "offices"
  add_foreign_key "receipt_booklets", "users"
  add_foreign_key "receipt_corrections", "receipt_statuses"
  add_foreign_key "receipt_corrections", "users"
  add_foreign_key "receipt_statuses", "confirmations"
  add_foreign_key "receipt_statuses", "receipt_booklets"
  add_foreign_key "searches", "confirm_types"
  add_foreign_key "searches", "offices"
end

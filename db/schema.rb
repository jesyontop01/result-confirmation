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

ActiveRecord::Schema.define(version: 2023_09_21_155826) do

  create_table "Grade", primary_key: "GradeType", id: :string, limit: 1, default: nil, force: :cascade do |t|
    t.string "GradeValue", limit: 2, null: false
    t.string "GradeDesc", limit: 15, null: false
  end

  create_table "api_results", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "app_service_types", force: :cascade do |t|
    t.string "ServiceType"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "confirm_backup_data", force: :cascade do |t|
    t.bigint "confirmation_id"
    t.string "CandNo"
    t.string "Results"
    t.string "FormNo"
    t.string "Surname"
    t.string "FirstName"
    t.string "OtherNames"
    t.string "DOB"
    t.string "Sex"
    t.text "Pix"
    t.string "CentreName"
    t.string "CertificateNo"
    t.string "SecurityDigit"
    t.string "Award"
    t.string "CertificateStatus"
    t.string "DatePrinted"
    t.string "ExamTitle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_id"], name: "index_confirm_backup_data_on_confirmation_id"
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

  create_table "confirmation_images", force: :cascade do |t|
    t.string "filetype"
    t.string "filename"
    t.string "filesize"
    t.text "base64"
    t.integer "dietId"
    t.string "candNo"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_confirmation_images_on_user_id"
  end

  create_table "confirmations", force: :cascade do |t|
    t.integer "user_id"
    t.integer "diet_id"
    t.integer "year_id"
    t.string "examYear", limit: 50
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
    t.boolean "isPrinted", default: false
    t.string "Local_Ref_no"
    t.datetime "DatePrinted"
    t.boolean "IsVeriferResult", default: false
    t.index ["confirm_country_id"], name: "index_confirmations_on_confirm_countries_id"
    t.index ["confirm_type_id"], name: "index_confirmations_on_confirm_type_id"
    t.index ["diet_id"], name: "index_confirmations_on_dietTbl_id"
    t.index ["payment_id"], name: "index_confirmations_on_payment_id"
    t.index ["user_id"], name: "index_confirmations_on_user_id"
    t.index ["year_id"], name: "index_confirmations_on_yearTbl_id"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.bigint "division_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["division_id"], name: "index_finance_depts_on_division_id"
  end

  create_table "departments1", force: :cascade do |t|
    t.string "name"
    t.bigint "division_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["division_id"], name: "index_departments_on_division_id"
  end

  create_table "depts", id: :bigint, force: :cascade do |t|
    t.string "name"
    t.bigint "division_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "diets", force: :cascade do |t|
    t.varchar "DietName", limit: 50
  end

  create_table "divisions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.bigint "waec_zonal_office_id"
    t.index ["waec_zonal_office_id"], name: "index_offices_on_waec_zonal_office_id"
  end

  create_table "packing_lists", force: :cascade do |t|
    t.string "attachment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "waec_office_id"
    t.index ["waec_office_id"], name: "index_packing_lists_on_waec_office_id"
  end

  create_table "payments", id: :bigint, force: :cascade do |t|
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
    t.index ["receipt_no"], name: "index_payments_on_receipt_no", unique: true
  end

  create_table "payments2", id: false, force: :cascade do |t|
    t.nchar "j", limit: 10
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
    t.index ["rangeFrom"], name: "index_receipt_booklets_on_rangeFrom", unique: true
    t.index ["rangeTo"], name: "index_receipt_booklets_on_rangeTo", unique: true
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

  create_table "signatures", force: :cascade do |t|
    t.string "filetype"
    t.string "filename"
    t.integer "filesize"
    t.text "base64"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_signatures_on_user_id"
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
    t.integer "lp_no"
    t.boolean "activated", default: false
    t.datetime "activated_at"
    t.boolean "logged_in", default: false
    t.integer "is_signedIn", default: 0
    t.bigint "dept_id"
    t.bigint "role_id"
    t.boolean "admin"
    t.boolean "is_management", default: false
    t.index ["dept_id"], name: "index_users_on_dept_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, where: "([reset_password_token] IS NOT NULL)"
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  create_table "waec_centres", id: false, force: :cascade do |t|
    t.bigint "ID", null: false
    t.varchar "CentreCode", limit: 15, null: false
    t.varchar "Centre", limit: 255, null: false
    t.integer "ExamType", limit: 1, null: false
    t.integer "ExamYear", null: false
    t.datetime "DateModified", null: false
  end

  create_table "waec_centres1", id: :integer, force: :cascade do |t|
    t.varchar "centre_no", limit: 7
    t.char "centre_type", limit: 1
    t.varchar "centre_name", limit: 255
  end

  create_table "waec_exams", id: :integer, force: :cascade do |t|
    t.varchar "exam_name", limit: 25
    t.varchar "exam_diet", limit: 100, null: false
    t.varchar "table_name", limit: 25, null: false
    t.varchar "centre_table_name", limit: 25, null: false
    t.varchar "pix_folder", limit: 25
    t.datetime "created_at"
    t.boolean "consolidated"
    t.integer "waec_user_id"
    t.integer "exam_year"
  end

  create_table "waec_exams3", id: :integer, force: :cascade do |t|
    t.varchar "exam_name", limit: 25
    t.varchar "exam_diet", limit: 100, null: false
    t.varchar "table_name", limit: 25, null: false
    t.varchar "centre_table_name", limit: 25, null: false
    t.varchar "pix_folder", limit: 25
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "waec_offices", force: :cascade do |t|
    t.varchar "State_Name", limit: 255
    t.varchar "State_Code", limit: 2, null: false
    t.varchar "OfficeAddress", limit: 200
    t.varchar "State_Head", limit: 50
    t.decimal "GPSLong", precision: 9, scale: 6
    t.decimal "GPSLat", precision: 9, scale: 6
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

  create_table "waec_subjects", id: false, force: :cascade do |t|
    t.char "SubjectCode", limit: 3, null: false
    t.char "ExamYear", limit: 4
    t.varchar "ShortName", limit: 15, null: false
    t.varchar "LongName", limit: 50, null: false
    t.varchar "ResultName", limit: 10
  end

  create_table "waec_subjects_1970s", id: false, force: :cascade do |t|
    t.char "SubjectCode", limit: 3, null: false
    t.char "SubjectCodeOld", limit: 3
    t.char "ExamYear", limit: 4
    t.varchar "ShortName", limit: 15, null: false
    t.varchar "LongName", limit: 50, null: false
    t.varchar "ResultName", limit: 10
  end

  create_table "waec_zonal_offices", force: :cascade do |t|
    t.string "ZoneName"
    t.bigint "office_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_waec_zonal_offices_on_office_id"
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

  create_table "wassce_pc1_2020s", id: :integer, force: :cascade do |t|
    t.varchar "record_type", limit: 2
    t.varchar "exam_no", limit: 10
    t.varchar "sex", limit: 1
    t.varchar "disability", limit: 1
    t.varchar "date_of_birth", limit: 8
    t.varchar "full_name", limit: 40
    t.varchar "results", limit: 36
    t.varchar "form_no", limit: 10
    t.varchar "security_digit", limit: 2
    t.varchar "release_batch", limit: 2
    t.varchar "award", limit: 1
  end

  create_table "web_service_credentials", force: :cascade do |t|
    t.bigint "web_services_id"
    t.string "clientURL"
    t.string "authURL"
    t.string "submitURL"
    t.string "username"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["web_services_id"], name: "index_web_service_credentials_on_web_services_id"
  end

  create_table "web_service_file_upload_responses", force: :cascade do |t|
    t.bigint "confirmation_id"
    t.string "clientUploadId"
    t.integer "referenceNumber"
    t.string "status"
    t.integer "uploadId"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_id"], name: "index_web_service_file_upload_responses_on_confirmation_id"
  end

  create_table "web_services", force: :cascade do |t|
    t.string "clientName"
    t.string "clientURL"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authURL"
    t.string "submitURL"
    t.string "username"
    t.string "password"
    t.bigint "app_service_types_id"
    t.index ["app_service_types_id"], name: "index_web_services_on_app_service_types_id"
  end

  create_table "years", force: :cascade do |t|
    t.varchar "YearName", limit: 5
  end

  add_foreign_key "assignments", "roles"
  add_foreign_key "assignments", "users"
  add_foreign_key "confirm_amounts", "confirm_types"
  add_foreign_key "confirm_backup_data", "confirmations"
  add_foreign_key "confirm_countries", "confirm_types"
  add_foreign_key "confirmation_images", "users"
  add_foreign_key "confirmations", "confirm_countries"
  add_foreign_key "confirmations", "confirm_types"
  add_foreign_key "departments", "divisions"
  add_foreign_key "departments1", "divisions"
  add_foreign_key "offices", "waec_zonal_offices"
  add_foreign_key "packing_lists", "waec_offices"
  add_foreign_key "receipt_booklets", "offices"
  add_foreign_key "receipt_booklets", "users"
  add_foreign_key "receipt_corrections", "receipt_statuses"
  add_foreign_key "receipt_corrections", "users"
  add_foreign_key "receipt_statuses", "confirmations"
  add_foreign_key "receipt_statuses", "receipt_booklets"
  add_foreign_key "searches", "confirm_types"
  add_foreign_key "searches", "offices"
  add_foreign_key "signatures", "users"
  add_foreign_key "users", "departments", column: "dept_id"
  add_foreign_key "users", "roles"
  add_foreign_key "waec_zonal_offices", "offices"
  add_foreign_key "web_service_file_upload_responses", "confirmations"
end

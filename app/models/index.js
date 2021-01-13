const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  timezone: "Asia/Kolkata",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.patient_tbl = require("./patient_tbl.model.js")(sequelize, Sequelize);
// db.patient_appointment_tbl = require("./patient_appointment_tbl.model.js")(sequelize, Sequelize);

// db.patient_relative_history = require("./paitent_relativehistory.model")(sequelize, Sequelize);
// db.master_realtionships = require("./master_relationships.model")(sequelize, Sequelize);
// db.settings_tbl = require("./master_settings.model")(sequelize, Sequelize);
// db.tbl_master_modules = require("./master_modules.model")(sequelize, Sequelize);
// db.tbl_master_controllers = require("./master_controllers.model")(sequelize, Sequelize);
// db.master_configurations = require("./master_configurations.model")(sequelize, Sequelize);
// db.master_patient_controllers = require("./master_patient_controllers.model")(sequelize, Sequelize);

db.users = require("./user.model")(sequelize, Sequelize);
db.subscription = require("./subscription.model")(sequelize, Sequelize);
db.user_subscription = require("./user_subscription.model")(sequelize, Sequelize);

// db.assessments = require("./assessments.model.js")(sequelize, Sequelize);
// db.assessments_review = require("./assessments_review.model.js")(sequelize, Sequelize );
// db.supermodules_tbl = require("./supermodules_tbl.model")(sequelize, Sequelize);
// db.module_pages_tbl = require("./module_pages_tbl.model")(sequelize, Sequelize);
// db.module_controller_tbl = require("./module_controller_tbl.model")(sequelize, Sequelize);
// db.timezone_tbl = require("./timezones.model")(sequelize, Sequelize);
// db.audit_trails = require("./audit_trails.model.js")(sequelize, Sequelize);
// db.category_tbl = require("./category_tbl.model.js")(sequelize, Sequelize);
// db.category_type_tbl = require("./category_type_tbl.model.js")(sequelize, Sequelize);
// db.tbl_languages = require("./languages_tbl.model")(sequelize, Sequelize);

// // 
// db.tbl_country = require("./country_tbl_model")(sequelize, Sequelize);
// db.tbl_state = require("./state_tbl_model")(sequelize, Sequelize);
// db.tbl_city = require("./city_tbl_model")(sequelize, Sequelize);
// // 


// db.clinic_tbl = require("./clinic_tbl.model")(sequelize, Sequelize);
// db.specialazation = require("./specilization_tbl.model")(sequelize, Sequelize);
// db.tbl_councill = require("./council_list_tbl.model")(sequelize, Sequelize);
// db.medicine_type_detail = require("./medicine_type_details_tbl.model")(sequelize, Sequelize);
// db.notifications_tbl = require("./notifications_tbl.model")(sequelize, Sequelize);

// db.problem_tbl = require("./problem_tbl.model")(sequelize, Sequelize);
// db.purpose_consultation_tbl = require("./purpose_consultation.model")(sequelize, Sequelize);
// db.patient_past_history = require("./patient_past_history.model")(sequelize, Sequelize);

// db.symptoms_icd_code = require("./symptoms_icd_code.model")(sequelize, Sequelize);
// db.symptoms_tbl = require("./symptoms_tbl.model")(sequelize, Sequelize);
// db.doctor_preferred_tbl = require("./doctor_preferred_tbl.model")(sequelize, Sequelize);
// db.specialities_tbl = require("./speciality_tbl_model")(sequelize, Sequelize);
// db.coupans_tbl = require("./coupan.model")(sequelize, Sequelize);
// db.pages_tbl = require("./pages.model")(sequelize, Sequelize);

// db.telemedicine_schedule_tbl = require("./telemedicine_schedule_tbl.model")(sequelize, Sequelize);
// db.clinic_schedule_tbl = require("./clinic_schedule_tbl.model")(sequelize, Sequelize);
// db.doctor_slot_timings_tbl = require("./doctor_slot_timings_tbl.model")(sequelize, Sequelize);
// db.doctor_tbl = require("./doctor_tbl.model")(sequelize, Sequelize);
// db.consultnow_draft_tbl = require("./consultnow_draft_tbl.model")(sequelize, Sequelize);

// db.telemedicine_schedule_child_tbl = require("./telemedicine_schedule_child_tbl.model")(sequelize, Sequelize);
// db.clinic_schedule_child_tbl = require("./clinic_schedule_child_tbl.model")(sequelize, Sequelize);
// db.vital_information_tbl = require("./vital_information_tbl.model")(sequelize, Sequelize);
// db.vitals_tbl = require("./vitals_tbl.model")(sequelize, Sequelize);
// db.doctor_experience_tbl = require("./doctor_experience_tbl.model")(sequelize, Sequelize);
// db.tbl_healthos_medicine_data = require("./healthos_medicine_data.model")(sequelize, Sequelize);
// db.tbl_doctor_refund = require("./doctor_refund_table.model")(sequelize, Sequelize);
// db.tbl_doctor_rating = require("./doctor_rating_tbl.model")(sequelize, Sequelize);
// db.doctor_registration = require("./doctor_registration_tbl.model")(sequelize, Sequelize);
// db.doctor_education = require("./doctor_education_tbl.model")(sequelize, Sequelize);
// db.doctor_consultation_prices = require("./doctor_consultation_prices_tbl.model")(sequelize, Sequelize);
// db.doctor_clinic_mapping = require("./doctor_clinic_mapping_tbl.model")(sequelize, Sequelize);
// db.doctor_clinic_mapping = require("./doctor_refund_table_tbl.model")(sequelize, Sequelize);
// db.doctor_reviews_like_disliked = require("./doctor_reviews_like_disliked_tbl.model")(sequelize, Sequelize);
// db.documents_tbl = require("./documents_tbl.model")(sequelize, Sequelize);
// db.labtest_prefered = require("./labtest_prefered_table_tbl.model")(sequelize, Sequelize);
// db.lab_radiology_test = require("./lab_radiology_test_tbl.model")(sequelize, Sequelize);
// db.admin_users = require("./admin_users_tbl.model")(sequelize, Sequelize);
// db.appointment_tbl_status = require("./appointment_status")(sequelize, Sequelize);

// db.master_roles_tbl = require("./master_roles_tbl.model")(sequelize, Sequelize);
// db.retailer_registration_tbl = require("./retailer_registration_tbl.model")(sequelize, Sequelize);


// // Master Modules Series
// db.master_modules_tbl = require("./master_modules_tbl.model")(sequelize, Sequelize);
// db.master_sub_module_tbl = require("./master_sub_module_tbl.model")(sequelize, Sequelize);
// db.master_sub_module_pages_tbl = require("./master_sub_module_pages_tbl.model")(sequelize, Sequelize);
// db.master_sub_module_clinic_pages_tbl = require("./master_sub_module_clinic_pages_tbl.model")(sequelize, Sequelize);
// // Series Ends here
// db.appointment_cancellation_reasons = require("./appointment_cancellation_reasons_tbl.model")(sequelize, Sequelize);




// --------------------------------------- OMC ------------------------------------------//
// db.medicine_details = require("./OM/medicine_details_tbl.model")(sequelize, Sequelize);
// db.delivery_address_tbl = require("./OM/delivery_address_tbl.model")(sequelize, Sequelize);
// db.cart_tbl = require("./OM/cart_tbl.model")(sequelize, Sequelize);
// db.favorite_medicine_tbl = require("./OM/favorite_medicine_tbl.model")(sequelize, Sequelize);
// db.wishlist_medicine_tbl = require("./OM/wishlist_medicine_tbl.model")(sequelize, Sequelize);
// db.retailer_products_tbl = require("./OM/retailer_products_tbl.model")(sequelize, Sequelize);
// db.retailer_stock_tbl = require("./OM/retailer_stock_tbl.model")(sequelize, Sequelize);
// db.products_master_tbl = require("./OM/products_master_tbl.model")(sequelize, Sequelize);
// db.shortage_book_tbl = require("./OM/shortage_book_tbl.model")(sequelize, Sequelize);
// db.retailer_finalorder_tbl = require("./OM/retailer_finalorder_tbl.model")(sequelize, Sequelize);
// db.order_processing_tbl = require("./OM/order_processing_tbl.model")(sequelize, Sequelize);
// db.order_status_tbl = require("./OM/order_status_tbl.model")(sequelize, Sequelize);
// db.order_tbl = require("./OM/order_tbl.model")(sequelize, Sequelize);
// db.order_cancellation_reasons_tbl = require("./OM/order_cancellation_reasons_tbl.model")(sequelize, Sequelize);
// db.product_request_tbl = require("./OM/product_request_tbl.model")(sequelize, Sequelize);
// db.order_invoice_tbl = require("./OM/order_invoice_tbl.model")(sequelize, Sequelize);
// ....................................... Ends here ....................................//

module.exports = db;

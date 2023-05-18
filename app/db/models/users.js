const mongoose = require("mongoose");

const users = new mongoose.Schema({
  personel_details: {
    first_name: "string",
    last_name: "string",
    short_name: "string",
    image: "string",
    gender: "string",
    phone: "string",
    personel_email: { type: "string", required: true, unique: true },
    emergency_contact: "string",
    pan: "string",
    blood_group: "string",
  },

  contact_details: {
    current_address: {
      address: "string",
      country: "string",
      state: "string",
      pincode: "number",
    },

    permanent_address: {
      address: "string",
      country: "string",
      state: "string",
      pincode: "number",
    },
  },

  official_details: {
    employee_code: "string",
    job_title: "string",
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'departments'},
    employee_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee_types",
    },
    profile_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile_statuses",
    },
    official_email: { type: "string", required: true, unique: true },
    date_of_join: "string",
    profile_privacy: {
      private: Boolean,
      public: Boolean,
    },
  },

  account_details: [
    {
      bank_name: "string",
      account_no: "string",
      ifsc: "string",
      branch_name: "string",
      account_holder : "string"
    },
  ],

  salary: [
    {
      label: "string",
      value : "string",
    },
  ],

  // skills : [{
  //   skill : 'string'
  // }],

  skills : [String],

  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  last_login: "string",
  password_token: "string",
  user_type: { type: mongoose.Schema.Types.ObjectId, ref: "user_types" },
},
{
    timestamps : true,
});


module.exports = mongoose.model('users', users);

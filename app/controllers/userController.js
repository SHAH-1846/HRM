const userManager = require("../managers/userManager");
const success_function = require("../utils/response-handler").success_function;
const error_function = require("../utils/response-handler").error_function;
const users = require("../db/models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const fileUpload = require('../utils/file-upload').fileUpload;
const set_password_template =require("../utils/email-templates/set-password").resetPassword;
const Cryptr = require("cryptr");
const sendEmail = require("../utils/send-email").sendEmail;
const resetPassword = require("../utils/email-templates/resetPassword").resetPassword;

exports.fetchAll = async function (req, res) {
  
  try {
    
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (token) {
      let decoded = jwt.decode(token);
      let req_user = await users.findOne({ _id: decoded.user_id });

      if (req_user) {

        let users_data = await users
          .find()
          // .populate({path : 'official_details.department', select : 'department'})
          // .populate({path : 'official_details.department', select : 'department -_id'})
          .populate("official_details.department", "department -_id")
          .populate("official_details.employee_type", "employee_type -_id")
          .populate(
            "official_details.profile_status",
            "profile_status -_id"
          )
          .populate("user_type", "user_type -_id");

        if (users_data) {
         let response =  success_function({
            status: 200,
            data: users_data,
            massage: "Users fetched successfully",
          });

          res.status(response.statusCode).send(response);
        }else {
          let response = error_function({status : 400, message : "User data not found"});
          res.status(response.statusCode).send(response);
        }
      } else {
        let response = error_function({ status: 400, message: "Requested user not found" });
        res.status(response.statusCode).send(response);
      }
    } else {
      let response = error_function({ status: 400, message: "Token is required" });
      res.status(response.statusCode).send(response);
    }
  } catch (error) {
    let response = error_function({
      status: 400,
      message: error
        ? error.message
          ? error.message
          : error
        : "Something went wrong",
    });

    res.status(response.statusCode).send(response);
  }
};

exports.fetchOne = async function (req, res) {
  
  try {

    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;
  
    let id = req.params.id;

    if (token && id) {
      let decoded = jwt.decode(token);
      let req_user = await users.findOne({ _id: decoded.user_id });
      if (req_user) {
        let users_data = await users
          .findOne({ _id: id })
          // .populate({path : 'official_details.department', select : 'department'})
          // .populate({path : 'official_details.department', select : 'department -_id'})
          .populate("official_details.department", "department -_id")
          .populate("official_details.employee_type", "employee_type -_id")
          .populate(
            "official_details.profile_status",
            "profile_status -_id"
          )
          .populate("user_type", "user_type -_id");

        if (users_data) {
          let response = success_function({
            status: 200,
            data: users_data,
            message: "Users fetched successfully",
          });

          res.status(response.statusCode).send(response);

        }else {
          let response = error_function({status : 400, message : "User details not found"});
        }
      } else {
        let response = error_function({ status: 400, message: "Requested user not found" });
        res.status(response.statusCode).send(response);
      }
    } else {
      if (!token){
        
        let response  =  error_function({ status: 400, message: "Token is required" });
        res.status(response.statusCode).send({response});
    
    }
      if (!id) {
        
        let response = error_function({ status: 400, message: "Id is required" });
        res.status(response.statusCode).send(response);
      
      }
    }
  } catch (error) {
   let response =  error_function({
      status: 400,
      message: error
        ? error.message
          ? error.message
          : error
        : "Something went wrong",
    });

    res.status(response.statusCode).send(response);
  }

};

exports.fetchProfile = async function (req, res) {

  try {

    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;

    let decoded = jwt.decode(token);
    console.log("user_id : ", decoded.user_id);

    let users_data = await users
      .findOne({ _id: decoded.user_id })
      .populate("official_details.department", "department -_id")
      .populate("official_details.employee_type", "employee_type -_id")
      .populate("official_details.profile_status", "profile_status -_id")
      .populate("user_type", "user_type -_id");

    if (users_data) {
     let response =  success_function({
        status: 200,
        data: users_data,
        message: "User fetched successfully",
      });

      res.status(response.statusCode).send(response);
    }else {
      let response = error_function({status : 400, message : "User data not found"})
      res.status(response.statusCode).send(response);
    }
  } catch (error) {
    let response = error_function({
      status: 400,
      message: error
        ? error.message
          ? error.message
          : error
        : "Something went wrong",
    });

    res.status(response.statusCode).send(response);
  }
  
};



exports.addNewUser = async function (req, res) {

  try {

    const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;


  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const short_name = req.body.short_name;
  let image = req.body.image;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const personel_email = req.body.personel_email;
  const emergency_contact = req.body.emergency_contact;
  const pan = req.body.pan;
  const blood_group = req.body.blood_group;


  const current_address = req.body.current_address;
  const current_country = req.body.current_country;
  const current_state = req.body.current_state;
  const current_pincode = req.body.current_pincode;

  const permanent_address = req.body.permanent_address;
  const permanent_country = req.body.permanent_country;
  const permanent_state = req.body.permanent_state;
  const permanent_pincode = req.body.permanent_pincode;

  const employee_code = req.body.employee_code;
  const job_title = req.body.job_title;
  const department_id = req.body.department_id;
  const employee_type_id = req.body.employee_type_id;
  const profile_status_id = req.body.profile_status_id;
  const official_email = req.body.official_email;
  const date_of_join = req.body.date_of_join;
  const profile_privacy = req.body.profile_privacy;


  const bank_name = req.body.bank_name;
  const account_no = req.body.account_no;
  const ifsc = req.body.ifsc;
  const branch_name = req.body.branch_name;
  const account_holder = req.body.account_holder;

  const salary = req.body.salary;


  const skills = req.body.skills;
  const user_type_id = req.body.user_type_id;


  //Generating random password for new user
  function generateRandomPassword(length) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
    let password = "";
    
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    
    return password;
  }
  
  let randomPassword = generateRandomPassword(12);
  console.log(randomPassword);

  let salt = bcrypt.genSaltSync(10);
  let password = bcrypt.hashSync(randomPassword, salt);
  
  //doing functions on payloads
  
  let decoded = jwt.decode(token);
  
  let req_user = await users.findOne({_id : decoded.user_id});
  
  if(req_user) {

    let new_user = new users({

      personel_details: {
        first_name: first_name,
        last_name: last_name,
        short_name: short_name,
        // image: "",
        gender: gender,
        phone: phone,
        personel_email: personel_email,
        emergency_contact: emergency_contact,
        pan: pan,
        blood_group: blood_group,
      },
    
      contact_details: {
        current_address: {
          address: current_address,
          country: current_country,
          state: current_state,
          pincode: current_pincode,
        },
    
        permanent_address: {
          address: permanent_address,
          country: permanent_country,
          state: permanent_state,
          pincode: permanent_pincode,
        },
      },
    
      official_details: {
        employee_code: employee_code,
        job_title: job_title,
        department: department_id,
        employee_type: employee_type_id,
        profile_status: profile_status_id,
        official_email: official_email,
        date_of_join: date_of_join,
        profile_privacy: profile_privacy,
      },
    
      account_details: [
        {
          bank_name: bank_name,
          account_no: account_no,
          ifsc: ifsc,
          branch_name: branch_name,
          account_holder : account_holder,
        },
      ],
    
      salary: salary,
    
      // skills : [{
      //   skill : 'string'
      // }],
    
      skills : skills,
    
      email: official_email,
      password: password,
      // last_login: "string",
      // password_token: "string",
      user_type: user_type_id,
    

    });


   

    
    if (image && image != "removed") {
      image = await fileUpload(image, "users");
      new_user.personel_details.image = image;
    } else if (image == "removed") {
      new_user.personel_details.image = null;
    }


    // await users.findOneAndUpdate({ email: official_email }, new_user, {
    //   upsert: true,
    //   new: true,
    // });

    let saved = await new_user.save();

    if(saved) {

      let email_template = await set_password_template(
        first_name,
        official_email,
        randomPassword
      );

      // await sendEmail(official_email, "Update Password", email_template);


      
      let response = success_function({"status" : 200, "message" : "User created successfully and login details send to official email"});
    

      res.status(response.statusCode).send(response);
      

    }else {
      let response = error_function({"status" : 400, "message" : "User not created"});

      res.status(response.statusCode).send(response);
    }

    // console.log(email_template);

  }else {
    let response = error_function({"status" : 400, "message" : "Requested user not found"});
    res.status(response.statusCode).send(response);
  }
    
  } catch (error) {
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
    } else {
      let response = error_function({"status" : 400, "message" : error});
      res.status(response.statusCode).send(response);
    }
  }
  

};




exports.editUser = async function (req, res) {

  try {

    const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;

    const id = req.params.id;

  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const short_name = req.body.short_name;
  let image = req.body.image;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const personel_email = req.body.personel_email;
  const emergency_contact = req.body.emergency_contact;
  const pan = req.body.pan;
  const blood_group = req.body.blood_group;


  const current_address = req.body.current_address;
  const current_country = req.body.current_country;
  const current_state = req.body.current_state;
  const current_pincode = req.body.current_pincode;

  const permanent_address = req.body.permanent_address;
  const permanent_country = req.body.permanent_country;
  const permanent_state = req.body.permanent_state;
  const permanent_pincode = req.body.permanent_pincode;

  const employee_code = req.body.employee_code;
  const job_title = req.body.job_title;
  const department_id = req.body.department_id;
  const employee_type_id = req.body.employee_type_id;
  const profile_status_id = req.body.profile_status_id;
  const official_email = req.body.official_email;
  const date_of_join = req.body.date_of_join;
  const profile_privacy = req.body.profile_privacy;


  const bank_name = req.body.bank_name;
  const account_no = req.body.account_no;
  const ifsc = req.body.ifsc;
  const branch_name = req.body.branch_name;
  const account_holder = req.body.account_holder;



  const salary = req.body.salary;


  const skills = req.body.skills;

  const user_type_id = req.body.user_type_id;


 
  
  //doing functions on payloads
  
  let decoded = jwt.decode(token);
  
  let req_user = await users.findOne({_id : decoded.user_id});
  
  if(req_user) {

    let updated_user = {

      "personel_details.first_name" : first_name,
        "personel_details.last_name" : last_name,
        "personel_details.short_name" : short_name,
        // "personel_details.image" : image,
        "personel_details.gender" : gender,
        "personel_details.phone" : phone,
        "personel_details.personel_email" : personel_email,
        "personel_details.emergency_contact" : emergency_contact,
        "personel_details.pan" : pan,
        "personel_details.blood_group" : blood_group,
    
      contact_details: {
        current_address: {
          address: current_address,
          country: current_country,
          state: current_state,
          pincode: current_pincode,
        },
    
        permanent_address: {
          address: permanent_address,
          country: permanent_country,
          state: permanent_state,
          pincode: permanent_pincode,
        },
      },
    
      official_details: {
        employee_code: employee_code,
        job_title: job_title,
        department: department_id,
        employee_type: employee_type_id,
        profile_status: profile_status_id,
        official_email: official_email,
        date_of_join: date_of_join,
        profile_privacy: profile_privacy,
      },
    
      account_details: [
        {
          bank_name: bank_name,
          account_no: account_no,
          ifsc: ifsc,
          branch_name: branch_name,
          account_holder : account_holder,
        },
      ],
    
      salary: salary,
    
      skills : skills,
    
      email: official_email,

      user_type: user_type_id,
    

    }


    if (image && image != "removed") {
      image = await fileUpload(image, "users");
      updated_user['personel_details.image'] = image;
    } else if (image == "removed") {
      updated_user['personel_details.image'] = null;
    }





    await users.updateOne({ _id: id }, {
      $set : updated_user,
    },

    );

    
    let response = success_function({"status" : 200, "message" : "User updated successfully"});
    
  
    res.status(response.statusCode).send(response);

  }else {
    let response = error_function({"status" : 400, "message" : "Requested user not found"});
    res.status(response.statusCode).send(response);
  }
    
  } catch (error) {
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
    } else {
      let response = error_function({"status" : 400, "message" : error});
      res.status(response.statusCode).send(response);
    }
  }
  

};
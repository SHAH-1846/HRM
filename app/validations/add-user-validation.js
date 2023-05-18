const validator= require('validator');
const isEmpty = require('./is_empty');



module.exports= function validateAddUserInput(data){


    let errors={};
    console.log("Validation file reached........");



    data.first_name= !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name= !isEmpty(data.last_name) ? data.last_name : '';
    data.short_name= !isEmpty(data.short_name) ? data.short_name : '';
    data.gender= !isEmpty(data.gender) ? data.gender : '';
    data.phone= !isEmpty(data.phone) ? data.phone : '';
    data.personel_email= !isEmpty(data.personel_email) ? data.personel_email : '';
    data.emergency_contact= !isEmpty(data.emergency_contact) ? data.emergency_contact : '';
    data.pan= !isEmpty(data.pan) ? data.pan : '';
    data.blood_group= !isEmpty(data.blood_group) ? data.blood_group : '';

    data.current_address= !isEmpty(data.current_address) ? data.current_address : ''
    data.current_country= !isEmpty(data.current_country) ? data.current_country : '';
    data.current_state= !isEmpty(data.current_state) ? data.current_state : '';
    data.current_pincode= !isEmpty(data.current_pincode) ? data.current_pincode : '';


    data.permanent_address= !isEmpty(data.permanent_address) ? data.permanent_address : ''
    data.permanent_country= !isEmpty(data.permanent_country) ? data.permanent_country : '';
    data.permanent_state= !isEmpty(data.permanent_state) ? data.permanent_state : '';
    data.permanent_pincode= !isEmpty(data.permanent_pincode) ? data.permanent_pincode : '';


    
    data.employee_code= !isEmpty(data.employee_code) ? data.employee_code : ''
    data.job_title= !isEmpty(data.job_title) ? data.job_title : '';
    data.department_id= !isEmpty(data.department_id) ? data.department_id : '';
    data.employee_type_id= !isEmpty(data.employee_type_id) ? data.employee_type_id : '';
    data.profile_status_id= !isEmpty(data.profile_status_id) ? data.profile_status_id : ''
    data.official_email= !isEmpty(data.official_email) ? data.official_email : '';
    data.date_of_join= !isEmpty(data.date_of_join) ? data.date_of_join : '';
    data.profile_privacy= !isEmpty(data.profile_privacy) ? data.profile_privacy : '';


    data.bank_name= !isEmpty(data.bank_name) ? data.bank_name : ''
    data.account_no= !isEmpty(data.account_no) ? data.account_no : '';
    data.ifsc= !isEmpty(data.ifsc) ? data.ifsc : '';
    data.branch_name= !isEmpty(data.branch_name) ? data.branch_name : '';
    data.account_holder= !isEmpty(data.account_holder) ? data.account_holder : '';

    data.salary= !isEmpty(data.salary) ? data.salary : '';

    data.skills= !isEmpty(data.skills) ? data.skills : '';
    data.user_type_id= !isEmpty(data.user_type_id) ? data.user_type_id : '';


    
     if (validator.isEmpty(data.first_name)) {
       errors.first_name = "First Name field is required";
     }

    if(!validator.isLength(data.first_name,{min: 2, max: 30})){
        errors.first_name= "First Name must be between 2 and 30";
    }

    if(validator.isEmpty(data.last_name)) {
        errors.last_name= "Last Name field is required";
    }

    if(!validator.isLength(data.last_name,{min: 1, max: 30})){
        errors.last_name= "Last Name must be between 1 and 30";
    }

    if(validator.isEmpty(data.short_name)) {
        errors.short_name= "short_name is required";
    }

    if(validator.isEmpty(data.gender)) {
        errors.gender= "gender is required";
    }

    if(validator.isEmpty(data.phone)) {
        errors.phone= "Phone number is required";
    }

    if(validator.isEmpty(data.personel_email)) {
        errors.personel_email_empty= "personel_email field is required";
    }
    
    if(!validator.isEmail(data.personel_email)) {
        errors.personel_email_invalid= "personel_email is invalid";
    }

    if(validator.isEmpty(data.emergency_contact)) {
        errors.emergency_contact= "emergency_contact is required";
    }

    if(validator.isEmpty(data.pan)) {
        errors.pan= "pan number is required";
    }

    if(validator.isEmpty(data.blood_group)) {
        errors.blood_group= "blood_group number is required";
    }



    if(validator.isEmpty(data.current_address)) {
        errors.current_address= "current_address is required";
    }

    if(validator.isEmpty(data.current_country)) {
        errors.current_country= "current_country is required";
    }

    if(validator.isEmpty(data.current_state)) {
        errors.current_state= "current_state is required";
    }

    if(validator.isEmpty(data.current_pincode)) {
        errors.current_pincode= "current_pincode is required";
    }
    
    
    



    console.log("Reached end of validation file....");
    console.log("Validation Errors : ", errors);
    console.log("isValid : ", isEmpty(errors));



  

    return {
        errors,
        isValid: isEmpty(errors),
    }


}
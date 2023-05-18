const userManager = require('../managers/userManager');
const revokeManager = require('../managers/revokeManager');
const success_function = require("../utils/response-handler").success_function;
const error_function = require("../utils/response-handler").error_function;
const users = require('../db/models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const sendEmail = require("../utils/send-email").sendEmail;
const resetPassword = require('../utils/email-templates/resetPassword').resetPassword;

exports.login = async function(req, res)
{
        
        try {

            let email = req.body.email;
            let password = req.body.password;

            if (email && password) {
              let user = await users.findOne({
                $and: [{ email: email }],
              });
              if (user) {
                //verifying password
                bcrypt.compare(password, user.password, async (error, auth) => {
                  if (auth === true) {
                    //valid credentials
                    //saving last login
                    await users.updateOne(
                      { _id: user._id },
                      { last_login: dayjs().format() }
                    );
                    let access_token = jwt.sign(
                      { user_id: user._id },
                      process.env.PRIVATE_KEY,
                      { expiresIn: "10d" }
                    );
                    let response =  success_function({
                      status: 200,
                      data: access_token,
                      message: "Login Successful",
                    });

                    res.status(response.statusCode).send(response);
                  } else {
                    let response = error_function({ status: 401, message: "Invalid Credentials" });

                    res.status(response.statusCode).send(response);
                  }
                });
              } else {
                let response = error_function({ status: 401, message: "Invalid Credentials" });
                res.status(response.statusCode).send(response);
              }
            } else {
              if (!email) {
                
                let response = error_function({ status: 422, message: "Email is required" });
                res.status(response.statusCode).send(response);

            
            }
              if (!password) {

                 let response = error_function({ status: 422, message: "Password is required" });
                 res.status(response.statusCode).send(response);

                }
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

}



exports.forgotPasswordController = async function(req, res)
{
    
    try {

        let email = req.body.email;

        if (email) {
          let user = await users.findOne({ email: email });
          if (user) {
            let reset_token = jwt.sign(
              { user_id: user._id },
              process.env.PRIVATE_KEY,
              { expiresIn: "10m" }
            );
            let data = await users.updateOne(
              { email: email },
              { $set: { password_token: reset_token } }
            );
            if (data.matchedCount === 1 && data.modifiedCount == 1) {
              let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
              let email_template = await resetPassword(
                user.first_name,
                reset_link
              );
              sendEmail(email, "Forgot password", email_template);
              let response = success_function({ status: 200, message: "Email sent successfully" });
              res.status(response.statusCode).send(response);
            } else if (data.matchedCount === 0) {

               let response =  error_function({ status: 404, message: "User not found" });
               res.status(response.statusCode).send(response);

            }
            else {
               let response =  error_function({ status: 400, message: "Password reset failed" });
               res.status(response.statusCode).send(response);

            }
          } else {
            let response  = error_function({ status: 403, message: "Forbidden" });
            res.status(response.statusCode).send(response);

          }
        } else {
           let response =  error_function({ status: 422, message: "Email is required" });
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
}




exports.passwordResetController = async function(req, res)
{
    
    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
    
        let password = req.body.password;


        decoded = jwt.decode(token);
        let user = await users.findOne({
          $and: [{ _id: decoded.user_id }, { password_token: token }],
        });
        if (user) {
          let salt = bcrypt.genSaltSync(10);
          let password_hash = bcrypt.hashSync(password, salt);
          let data = await users.updateOne(
            { _id: decoded.user_id },
            { $set: { password: password_hash, password_token: null } }
          );
          if (data.matchedCount === 1 && data.modifiedCount == 1) {
            let response = success_function({ status: 200, message: "Password changed successfully" });
            res.status(response.statusCode).send(response);
          }
          else if (data.matchedCount === 0) {

              let response = error_function({ status: 404, message: "User not found" });
              res.status(response.statusCode).send(response);

          }
          else {
            
           let response =  error_function({ status: 400, message: "Password reset failed" });
           res.status(response.statusCode).send(response);

          }
        } else {
            let response = error_function({ status: 403, message: "Forbidden" });
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
}



exports.checkRevoked = function(req, res) 
{
    return new Promise((resolve, reject)=>{
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        revokeManager.checkRevoked(token).then((message)=>{
            resolve(message);
        }).catch((error)=>{
            reject(error);
        });
    });
};
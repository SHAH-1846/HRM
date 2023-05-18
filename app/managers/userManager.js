const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const Cryptr = require('cryptr');
const sendEmail = require("../utils/send-email").sendEmail;
const users = require('../db/models/users');
const resetPassword = require('../utils/email-templates/resetPassword').resetPassword;
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;








  
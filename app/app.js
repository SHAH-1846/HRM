require("dotenv").config();

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./db/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bloodGroupsModel = require('./db/models/blood_groups');
const departmentsModel = require('./db/models/departments');
const employeeTypesMode = require('./db/models/employee_types');
const profileStatusModel = require('./db/models/profile_statuses');

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

app.use('/uploads',express.static(__dirname + '/uploads'));

//MongoDB connection
db.connect();
//Invoking server port connection
app.listen(process.env.NODE_PORT, () => {
    console.log(`Listening on port ${process.env.NODE_PORT}`);
});


//authentication routes
app.use(authRoutes);

//user routes
app.use(userRoutes);
const mongoose = require('mongoose');

const employee_types = new mongoose.Schema({
    employee_type : 'string',
},
{
    timestamps : true,
});


module.exports = mongoose.model('employee_types', employee_types);
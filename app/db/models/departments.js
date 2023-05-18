const mongoose = require('mongoose');

const departments = new mongoose.Schema({
    department : 'string',
},
{
    timestamps : true,
});


module.exports = mongoose.model('departments', departments);
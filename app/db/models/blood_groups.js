const mongoose = require('mongoose');

const blood_groups = new mongoose.Schema({
    blood_group : 'string',
},
{
    timestamps : true,
});


module.exports = mongoose.model('blood_groups', blood_groups);
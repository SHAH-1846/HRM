const mongoose = require('mongoose');

const profile_statuses = new mongoose.Schema({
    profile_status : 'string',
},
{
    timestamps : true,
});


module.exports = mongoose.model('profile_statuses', profile_statuses);
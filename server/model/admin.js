const mongoose = require('mongoose');
const constants = require('../utils/constants.js');

users = mongoose.createConnection(constants.mongo_users_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const adminSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        fname: String,
        lname: String,
        courses: Array,
        messages: Array
    },
    {
        timestamps: true
    }
);

const Admin = users.model('Admin', adminSchema);

module.exports = Admin;
const mongoose = require('mongoose');
const { users_db } = require('../db/db');

const adminSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        fname: String,
        lname: String,
        courses: Array,
        messages: Array,
        admin: Boolean
    },
    {
        timestamps: true
    }
);

const Admin = users_db.model('Admin', adminSchema);

module.exports = Admin;
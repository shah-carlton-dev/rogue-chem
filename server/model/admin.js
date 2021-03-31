const mongoose = require('mongoose');
const { users_db } = require('../db/db');

const adminSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        email: String,
        fname: String,
        lname: String,
        courses: Array,
        messages: Array,
        admin: Boolean
    },
    { timestamps: true }
);

const Admin = users_db.model('Admin', adminSchema);

module.exports = Admin;
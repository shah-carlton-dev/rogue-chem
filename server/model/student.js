const mongoose = require('mongoose');
const { users_db } = require('../db/db');

const studentSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        courses: Array,
        messages: Array,
        starredSections: Array,
        starredFiles: Array,
        bookmarkedFiles: Array,
        completedSections: Array,
        completedFiles: Array,
        admin: {
            type: Boolean,
            required: true
        },
    },
    { timestamps: true }
);

const Student = users_db.model('Student', studentSchema);

module.exports = Student;
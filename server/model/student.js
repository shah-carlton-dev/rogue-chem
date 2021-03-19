const mongoose = require('mongoose');
const constants = require('../utils/constants.js');

users = mongoose.createConnection(constants.mongo_users_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

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
        completedFiles: Array
    }
);

const Student = users.model('Student', studentSchema);

module.exports = Student;
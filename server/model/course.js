const mongoose = require('mongoose');
const { courses_db } = require('../db/db');

const courseSchema = mongoose.Schema(
    {
        published: Boolean,
        name: String,
        description: String,
        sections: Array,
        meta: Boolean,
        courses: {
            type: Array,
            required: false
        }
    },
    { timestamps: true }
);

const Course = courses_db.model('Course', courseSchema);

module.exports = Course;
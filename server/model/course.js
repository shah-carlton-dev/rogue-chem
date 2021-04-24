const mongoose = require('mongoose');
const { courses_db } = require('../db/db');

const courseSchema = mongoose.Schema(
    {
        published: Boolean,
        name: String,
        description: String,
        sections: Array,
        files: Array,
        videos: Array
    },
    { timestamps: true }
);

const Course = courses_db.model('Course', courseSchema);

module.exports = Course;
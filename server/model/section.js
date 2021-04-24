const mongoose = require('mongoose');
const { courses_db } = require('../db/db');

const sectionSchema = mongoose.Schema(
    {
        course_id: mongoose.ObjectId,
        name: String,
        description: String,
        files: Array,
        videos: Array
    },
    { timestamps: true }
);

const Section = courses_db.model('Section', sectionSchema);

module.exports = Section;
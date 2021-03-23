const mongoose = require('mongoose');
const { courses_db } = require('../db/db');

const sectionSchema = mongoose.Schema(
    {
        parent: String,
        child: String,
        name: String,
        description: String,
        files: Array
    },
    { timestamps: true }
);

const Section = courses_db.model('Section', sectionSchema);

module.exports = Section;
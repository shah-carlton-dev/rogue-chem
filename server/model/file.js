const mongoose = require('mongoose');
const { courses_db } = require('../db/db');

const fileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    keywords: {
      type: Array,
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const File = courses_db.model('File', fileSchema);  // param1: singular name (will look for lowercase, plural version of schema)

module.exports = File;
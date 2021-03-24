const mongoose = require('mongoose');
const { courses_db } = require('../db/db');

const videoSchema = mongoose.Schema(
    {
      url: {
        type: String,
        required: true,
        trim: true
      },
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
      }
    },
    { timestamps: true }
  );
  
  const Video = courses_db.model('Video', videoSchema);  // param1: singular name (will look for lowercase, plural version of schema)
  
  module.exports = Video;
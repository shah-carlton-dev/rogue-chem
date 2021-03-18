const mongoose = require('mongoose');

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
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);  // param1: singular name (will look for lowercase, plural version of schema)

module.exports = File;
const Mongoose = require('mongoose');
const constants = require('../utils/constants.js');

Mongoose.connect(constants.mongo_courses_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  console.log('Connection in progress...');
  if (err) throw err;
  else console.log('MongoDB connection: SUCCESS');
});
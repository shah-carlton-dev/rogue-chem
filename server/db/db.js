const Mongoose = require('mongoose');
const constants = require('../utils/constants.js');

const users_db = Mongoose.createConnection(constants.mongo_users_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (err) => {
  console.log('Connection in progress...');
  if (err) throw err;
  else console.log('MongoDB connection: SUCCESS');
});

const courses_db = users_db.useDb('courses');

module.exports = { users_db, courses_db };
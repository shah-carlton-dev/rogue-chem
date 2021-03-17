const mongoose = require('mongoose');
const constants = require('../utils/constants.js');
mongoose.connect(constants.mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true}, (err) => {
    console.log('connection in progress');
    if (err) throw err;
    else console.log('mongodb connection successful');
});
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    unique: true
  },
  passWord: {
    type: String
  }
})

const user = mongoose.model('user', userSchema);

module.exports = user;
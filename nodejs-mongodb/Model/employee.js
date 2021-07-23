const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  _id:{
    type: Number
  },
  passWord: {
    type: String
  },
  Salary: {
    type: String
  }
})

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;
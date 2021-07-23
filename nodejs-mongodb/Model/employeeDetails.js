const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
  employee_id:{
    type:String,
    unique: true
  },
  name:{
    type: String
  },
  "mobile Number": {
    type: String
  },
  "salary":{
    type:String
  },
  "position":{
    type:String
  }
})

const employeeDetails = mongoose.model('employeeDetails', employeesSchema);

module.exports = employeeDetails;
require('./db/mangoose');
const xlsx = require('xlsx');
const employeeExcels = require('./Model/employeeDetails')
const schedule = require('node-schedule');

const job = schedule.scheduleJob('0 */3 * * *', readFileAndUpdateToDb);

/**
 * read the data from Excel file and store 
 * into mongodb
 */
function readFileAndUpdateToDb() {
  const file = xlsx.readFile('./employeeDetails.xlsx')
  let data = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
  data.forEach((employee) => {
    employeeExcels.create(employee).then((data) => {
      console.log("sucessfull")
    }).catch((err) => {
      console.log("error" + employee.employee_id)
      employeeExcels.updateOne({ employee_id: employee.employee_id}, employee).then((data) => {
        console.log("sucess")
      }).catch((err) => {
        console.log(err)
      })
    })
  })
}
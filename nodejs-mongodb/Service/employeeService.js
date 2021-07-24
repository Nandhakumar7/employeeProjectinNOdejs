console.log("employeeService")
const Employee = require("../Model/employee")

/**
 * get details from user and create 
 * new employee in database
 */
addEmployee = async (session, employeeDetails) => {
  await Employee.create([employeeDetails],{session:session});
}

/**
 * get all employees data from database
 * @return return all employeedetails as a array
 */
getEmployees = async() => {
  let employeesData;
  try {
    employeesData = await Employee.find({})  
  } catch(e) {
    employeesData = null;
  }
  return employeesData;
} 

/**
 * get specific employee details from database
 * @param id   unique id for each employee
 * @return employeeData contains specific employeee details as a object.
 */
getEmployee = async(id) => {
  let employeeData;
  try {
    employeeData = await Employee.findById(id);
  } catch(e) {
    employeeData = null;
  }
  return employeeData;
}

/**
 * delete specific employee basen on id
 * @param id  unique id for each employee
 * @return boolean true when sucessfully deleted else return false.
 */
deleteEmployee = async(id) => {
  isDeleted = false;
  try { 
    await Employee.findByIdAndDelete(id);
    isDeleted = true; 
  } catch(e) {
    console.log(e)
  }
  return isDeleted;
}

module.exports = {addEmployee, getEmployees, getEmployee, deleteEmployee}

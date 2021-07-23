console.log("employeeService")
const Employee = require("../Model/employee")

//add new employee to database 
addEmployee = async (session, employeeDetails) => {
    await Employee.create([employeeDetails],{session:session});
}

//get all Employees from database
getEmployees = async() => {
    let employeesData;
    try {
        employeesData = await Employee.find({})  
    } catch (e) {
        employeesData = null;
    }
    return employeesData;
} 

//get Specfic Employee using their employee id
getEmployee = async(id) => {
    let employeeData;
    try {
        employeeData = await Employee.findById(id);
    } catch (e) {
        employeeData = null;
    }
    return employeeData;
}

//delete the employee details from database
deleteEmployee = async(id) => {
    isDeleted = false;
    try{
        await Employee.findByIdAndDelete(id);
        isDeleted = true; 
    } catch (e) {
        console.log(e)
    }
    return isDeleted;
}

//update details of employee using id
updateEmployee = async (req,res) => {
    console.log("update")
    const session = await sessionInstance.createSession();
    try {
        session.startTransaction();
        const employee = new Employee(req.body);
        await Employee.findByIdAndUpdate(req.params.id, employee,{session:session})
        await Employee.findByIdAndUpdate(7686, {"_id":76876,"Name":"thuuu","passWord":"jjjj","Salary":"678"},{session:session})
        await session.commitTransaction();
        session.endSession();
        res.send("sucessfully updated");
    } catch(e) {
        await session.abortTransaction();
        session.endSession();
        res.send("Failed to update");
    }
}

module.exports = {addEmployee, getEmployees, getEmployee, deleteEmployee}

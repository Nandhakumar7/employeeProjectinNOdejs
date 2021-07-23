console.log("employeeService")
const Customer = require("../Model/employeeDetails")

// add new customer to databse
addCustomer = async (session, userDetails) => {
    const customer = new Customer(userDetails);
    await customer.save({session:session});
}
module.exports = { addCustomer }
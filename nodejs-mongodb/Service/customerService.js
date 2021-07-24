console.log("customerServivce")
const Customer = require("../Model/employeeDetails")

/**
 * get details from user and created new 
 * customer in database
 */
addCustomer = async (session, userDetails) => {
  const customer = new Customer(userDetails);
  await customer.save({session:session});
}

module.exports = { addCustomer }
console.log("userService")
const user = require("../Model/user")

/**
 * get details from user and create 
 * nedw user in database
 */
addUser = async (session, userDetails) => {
  const users = new user(userDetails);
  await users.save({session:session});
}

module.exports = { addUser}
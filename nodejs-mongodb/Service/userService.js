console.log("userService")
const user = require("../Model/user")

// add new User to database
addUser = async (session, userDetails) => {
    const users = new user(userDetails);
    await users.save({session:session});
}

module.exports = { addUser}
const mongoose = require('../db/mangoose')

createSession = async(req, res, next) => {
    console.log("create session........")
    const session = await mongoose.startSession();
    session.startTransaction();
    req.currentSession = session;
    console.log("i am session create")
    next();
}

commitTransaction = async(req, res) => {
  console.log("commit transaction...........")
  const session = req.currentSession;
  await session.commitTransaction();
  session.endSession();
}
  
abortTransaction = async (err, req, res, next) => {
  console.log(err)
  console.log("aborttransaction...........")
  const session = req.currentSession;
  await session.abortTransaction();
  session.endSession();
}
  
module.exports = { createSession, commitTransaction, abortTransaction}
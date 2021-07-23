console.log("i am auth")
const mongoose = require('../db/mangoose')
const jwt = require('jsonwebtoken');
createSession = async() => {
    const session =  await mongoose.startSession();
    return session;
}

print = (session) => {
    console.log("i find idea to solveeeeeeeeeeee")
}

//auth guard to check user token
authGuard = async(req, res, next) => {
    jwt.verify(req.session.token, 'privateToken', async(err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            currentUser = req.session.user;
            //req.session.currentSession = await mongoose.startSession();
            next();
        }
    })
}

module.exports = { authGuard, createSession, print}
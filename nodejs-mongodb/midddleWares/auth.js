console.log("i am auth")
const jwt = require('jsonwebtoken');

/**
 * get the token from request and verify authorizded token 
 * or not if authorized token allow to access further request
 * else return 403 status
 */
authGuard = async(req, res, next) => {
  jwt.verify(req.session.token, 'privateToken', async(err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      currentUser = req.session.user;
      next();
    }
  })
}

module.exports = { authGuard}
const express = require('express');
const router = require('./Router/router');
const session = require('express-session');
const cookieParser = require('cookie-parser');
let MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
app.use(express.json());
const store = new MongoDBStore({
  uri: 'mongodb://localhost:2719/employees?replicaSet=myrpl',
  collection: 'Sessions'
});

//create session objects here....
app.use(session({ 
  secret: 'ssshhhhh',
  store: store,
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge :  10 * 60 * 1000
  }
}));
app.use(cookieParser());
app.use(router);

app.listen(3200, () => {
  console.log('running!!!');
});


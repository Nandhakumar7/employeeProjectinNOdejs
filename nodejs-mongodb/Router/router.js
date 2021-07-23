const express = require('express');
const authGuard = require('../AuthGuard/auth');
const router = new express.Router();
const employeeController = require('../Controller/employeeController');
const cors = require('cors')
let corsOptions = {
  "origin": 'http://localhost:4200',
  "methods": "GET,PUT,PATCH,POST"
} 
router.use(cors(corsOptions));

//check the user exists or not 
router.post('/logIn', employeeController.checkUserExists);

//sending email using nodemailer
router.post("/sendMail", authGuard.authGuard, employeeController.sendingMail);

//create new user to login
router.post('/signIn', employeeController.createUser);

//logout the session
router.delete('/logout', employeeController.logOutSession);

// add new Employee to database
router.post('/addEmployee', authGuard.authGuard, employeeController.addEmployee);

// get all employees from database
router.get('/getEmployees', authGuard.authGuard, employeeController.getEmployees);

// get specific employee using ID
router.get('/getEmployee/:id', authGuard.authGuard, employeeController.getEmployee);

// delete specific employe using id
router.delete('/deleteEmployee/:id', authGuard.authGuard, employeeController.deleteEmployee);

// update specific employee details using id 
router.put('/updateEmployee/:id', authGuard.authGuard, employeeController.updateEmployee);

//read excel file and upload file details into databse
router.post("/readExcel", authGuard.authGuard, employeeController.saveExcelValuetoDb)

router.use(authGuard.print)
module.exports = router;
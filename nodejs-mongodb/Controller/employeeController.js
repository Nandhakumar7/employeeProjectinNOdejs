const Employee = require('../Model/employee');
const User = require('../Model/user');
const jwt = require('jsonwebtoken');
let nodemailer = require('nodemailer');
const mongoose = require('../db/mangoose')
const employeeService = require("../Service/employeeService")
const userService = require("../Service/userService")
const CustomerService = require("../Service/customerService")
const user = require('../Model/user');
const employeeExcels = require('../Model/employeeDetails')
const xlsx = require('xlsx');
const sessionInstance = require('../AuthGuard/auth')

/**
 * create new employee in database
 */
addEmployee = async (req, res, next) => {
  const session = await sessionInstance.createSession();
  try {
    session.startTransaction();
    await userService.addUser(session, req.body[1])
    await employeeService.addEmployee(session, req.body[0])
    await CustomerService.addCustomer(session, req.body[2])
    await session.commitTransaction();
    res.send("Employee Created Sucessfully!!")
  } catch(e) {
    //console.log(e)
    console.log("error")
    await session.abortTransaction();
    res.send("failed to create Employee");
  }
  session.endSession();
}

//get all Employees from database
getEmployees = async(req, res, next) => {
  data = await employeeService.getEmployees();
  if(data != null) {
    res.send(data)
    next()
  } else {
    next();
    res.send("something went wrong !! please try again!!")
  }
} 

//get Specfic Employee using their employee id
getEmployee = async(req,res,next) => {
  data = await employeeService.getEmployee(req.params.id);
  if(data != null) {
    res.send(data)
  } else {
    res.send("something went wrong !! please try again!!")
    next(err)
  }  
}

//delete the employee details from database
deleteEmployee = (req,res) => {
  if(employeeService.deleteEmployee(req.params.id)) {
    res.send("deleted SucessFully!!!")
  } else {
    res.send("Failed to Delete!!!!")
  }  
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

//Create new user 
createUser = (req, res) => {
  const user = new User(req.body);
  user.save().then((user) => {
    res.status(201).send("sucessfully Created");
  }).catch((error) => {
    res.status(400).send(error);
  })
}

//check the given user exists or not
checkUserExists = (req, res) => {
  user.findOne({ userName:req.body.userName}).then((user) => {
    if(user == null) {
      res.send("user Does not Exists");
    } else {
      if(user.passWord == req.body.passWord) {
        req.session.user = user.userName;
        userId = user._id;
        req.session.token = jwt.sign({userId}, 'privateToken', { expiresIn: '1h' });
        res.send("Welcome  " + user.userName);
      } else {
        res.send("UserId & Password MisMatch")
      }
    }
  }).catch((error) => {
    res.status(400).send(error);
    console.log(error);
  })
}

//logout the session when user click logout
logOutSession = (req, res) => {
  console.log(req.session)
  req.session.destroy((err) => {
    if(err) {
      res.send("failed to logging out!!")
    }
    res.send("logout  sucessfully!!")
  })
}

//sending email to too user 
sendingMail = (req, res) => {
  receiverDetails = req.body;
  user.find({ userName: req.session.user}).then((user) =>{
    if(user == null) {
      res.send("please login again and try!")
    } else {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user[0].userName,
          pass: user[0].passWord
        }
      });
      transporter.sendMail({
        from: user[0].userName,
        to: receiverDetails.to,
        bcc: receiverDetails.bcc,
        subject: receiverDetails.subject,
        html: receiverDetails.message,
        attachments: [
          {
            filename: 'img.jpg',
            path: __dirname + '/img.jpg'
          }
        ]
      }).then((sucess) => {
        res.send("sucessfully send")
      }).catch((err) => {
        res.send("please tr again!")
      })
    }
  }) 
}

// save excel values into database
saveExcelValuetoDb = (req, res) => {
  const file = xlsx.readFile('./employeeDetails.xlsx')
  let data;
  data = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
  employeeExcels.insertMany(data).then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log(err)
  })
  res.send("sucessfull!!!!!")
}


// exports the method to use other modules 
module.exports = { 
  addEmployee, getEmployees,
  getEmployee, deleteEmployee, 
  updateEmployee, checkUserExists,
  createUser, authGuard,
  logOutSession, sendingMail,
  saveExcelValuetoDb
}; 
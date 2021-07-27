const Employee = require('../Model/employee');
const User = require('../Model/user');
const jwt = require('jsonwebtoken');
let nodemailer = require('nodemailer');
const employeeService = require("../Service/employeeService")
const userService = require("../Service/userService")
const CustomerService = require("../Service/customerService")
const user = require('../Model/user');
const employeeExcels = require('../Model/employeeDetails')
const xlsx = require('xlsx');

/**
 * create new employee in database
 */
addEmployee = async (req, res, next) => {
   const session = req.currentSession;
  try {
    await userService.addUser(session, req.body[1])
    await employeeService.addEmployee(session, req.body[0])
    await CustomerService.addCustomer(session, req.body[2])
    res.send("Employee Created Sucessfully!!");
    next();
  } catch(e) {
    next(e)
    console.log("error")
    res.send("failed to create Employee");
  }
  //session.endSession();
}

//get all Employees from database
getEmployees = async(req, res, next) => {
  console.log(req.session)
  data = await employeeService.getEmployees();
  if(data != null) {
    res.send(data)
    next()
  } else {
    next(new Error("failed to get"));
    res.send("something went wrong !! please try again!!")
  }
} 

//get Specfic Employee using their employee id
getEmployee = async(req,res,next) => {
  data = await employeeService.getEmployee(req.params.id);
  if(data != null) {
    res.send(data)
    next()
  } else {
    res.send("something went wrong !! please try again!!")
    next(new Error("failed to get"));
  }  
}

//delete the employee details from database
deleteEmployee = (req, res, next) => {
  if(employeeService.deleteEmployee(req.params.id)) {
    res.send("deleted SucessFully!!!")
    next()
  } else {
    res.send("Failed to Delete!!!!");
    next(new Error("failed to delete"));
  }  
}

//update details of employee using id
updateEmployee = async (req, res, next) => {
  console.log("update")
  const session = req.currentSession;
  try {
    const employee = new Employee(req.body);
    await Employee.findByIdAndUpdate(req.params.id, employee,{session:session})
    await Employee.findByIdAndUpdate(7686, {"_id":7686,"Name":"thuuu","passWord":"jjjj","Salary":"678"},{session:session})
    res.send("sucessfully updated");
    next();
  } catch(e) {
    next(e)
    res.send("Failed to update");
  }
}

//Create new user 
createUser = (req, res, next) => {
  const user = new User(req.body);
  user.save().then((user) => {
    res.status(201).send("sucessfully Created");
    next();
  }).catch((error) => {
    res.status(400).send(error);
    next(error);
  })
}

//check the given user exists or not
checkUserExists = (req, res) => {
  console.log("login i am ")
  console.log(req.body)
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
logOutSession = (req, res, next) => {
  console.log(req.session)
  req.session.destroy((err) => {
    if(err) {
      res.send("failed to logging out!!")
      next(err)
    }
    res.send("logout  sucessfully!!")
    next()
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
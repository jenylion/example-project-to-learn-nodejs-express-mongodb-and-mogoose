// error map
// 10: validation error
// 11: user login failed
// database error map
// 1: dubelcated uniqe field
// 2: database connection error
// 3: server error
const express = require('express');
const {User} = require('../modules/core')
const {validate} = require('../modules/validate')

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next) {
  const username= req.body.username
  const password= req.body.password

  // validating parameters
  let validateUsername = validate(username,{required: true, max:50, min:5, email: true})
  let validatePassword = validate(password,{required: true, max:50, min:6})

  if(validateUsername.check && validatePassword.check){
    User.checkLogin(username, password).then(result=>{
        req.session.user = result
        res.json('ok')
      
    }).catch(error=>{
      res.json({error:error})
    })
  }else{
    res.json({error:11})
  }
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.post('/register', function(req, res, next) {
  const fName= req.body.fname
  const lName= req.body.lname
  const email= req.body.email
  const password= req.body.password
  // variable to check all parameters are valid
  let checkValidate = true;

  // validating parameters
  let validateFname = validate(fName,{required: true, max:50, min:2})
  let validateLname = validate(lName,{required: true, max:50, min:2})
  let validateEmail = validate(email,{required: true, max:50, min:5, email:true})
  let validatePass = validate(password,{required: true, max:50, min:6, custom:{patern:"[0-9]+[a-z]|[a-z]+[0-9]", message:"Password must consist of at least one number and one alpha character"}})


if(!validateFname.check){
  checkValidate = false
}
if(!validateLname.check){
  checkValidate = false
}
if(!validateEmail.check){
  checkValidate = false
}
if(!validatePass.check){
  checkValidate = false
}
if(checkValidate){
  User.create(fName, lName, email, password).then(createdUser=>{
    res.json(createdUser)
    }).catch(error=>{
      res.json({error: error})
    })
}else{
  res.json({error: 10})
}

});
router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
});

module.exports = router;

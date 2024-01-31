const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')





const   JWT_SECRET = 'DURGAP&SWAIN@123'
// const   JWT_SECRET = SECRET_CODE        //.env

let success = true



//                                            CREATE USER 



//ROUTE 1 - CREATE A USER USING: post "/api/auth/createuser". no login required

router.post('/createuser', 
[body('name','Please enter your name').notEmpty(),
body('email','Please enter a valid email').isEmail(),
body('password','please enter a strong password').isLength({min:5})], 
async(req, res) => {
  //if there errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false
      return res.status(400).json({success, errors: result.array() });
    }
    try{
      //check wheather the email exist or not
      let user = await User.findOne({email:req.body.email});
      if(user){
        success = false
        return res.status(400).json({success,error:'This email already exists try another one'})
      }
    let salt = await bcrypt.genSalt(10)
    let secPass = await bcrypt.hash(req.body.password, salt) 
    //create a new user
    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    });
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
    success = true
    res.json({success,authToken})

  }catch(error){
    console.log(error.message)
    res.status(500).send('some error occured')
  }

})




//                                            USER LOGIN





//ROUTE 2 -Authenticate a user using: POST '/api/auth/login'.no login required
router.post('/userlogin',[
  body('email','Enter a valid Email and password').isEmail(),
  body('password','Enter a valid Email And password').exists()
], async(req,res) => {

  //if there errors, return bad request and the errors
  const result = validationResult(req);
  if (!result.isEmpty()) {
    success = false
    return res.status(400).json({success, errors: result.array() });
  }

  const{email,password} = req.body

  try{
    //check wheather the email exist or not
    let user = await User.findOne({email});
    if(!user){
      success = false
      return res.status(400).json({success ,error:'Please try to login with correct credentials'});
    }

    const passwordCompare =await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false
      return res.status(400).json({success,error:'Please try to login with correct credentials'})
    }

    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
    success = true
    res.json({success,authToken})

  }catch(error){
    console.log(error.message)
    res.status(500).send('Internal server error occured')
  }
})








//ROUTE 3 - get loggedin user details using: POST '/api/auth/login'.no login required



router.post('/userdata',fetchUser, async(req,res) => {

  try {

    const userID = req.user.id
    const user = await User.findById(userID).select("-password")
    success = true
    res.send({success,user})
    
  }catch(error){
    console.log(error.message)
    res.status(500).send('Route 3 Internal server error occured')
  }

})



module.exports = router;
const express = require('express')
const router = express.Router()

//importing controller
const {requireSignin,adminMiddleware} = require('../controller/auth');
const {read,update} = require('../controller/user.js');

router.get('/user/:id',requireSignin,read);
//requireSignin->validate the token by the time it reach read controller it has user as req.user 
//agar hum sigin karte hai to hame token milta hai jo server deta hai
// or only way to communicate between server and client is token.
//jab hame http://localhost:8000/api/user/624405afbed1d7bded452be6 ko bina authorization ka mtb bina token ka bejenge to error ayenga
//kyoki hamne requireSignin ye wala midleware lagaya hai jo token ko validate kar raha hai
// hame data chahiye to hame Authorization me Bearer <token> bhejna honga header me
// this way we send bearer token to backend.So that requireSignin will find the valid token and allow us to access protected routes
router.put('/user/update',requireSignin,update);
router.put('/admin/update',requireSignin,adminMiddleware,update);

module.exports= router;
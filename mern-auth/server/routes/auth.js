const express = require('express')
const router = express.Router()

//importing controller
const {signup,acccountActivation,signin,forgotPassword,resetPassword,googleLogin,facebookLogin} = require('../controller/auth.js')

//import validator
const {userSignupValidator,userSigninValidator,forgotPasswordValidator,resetPasswordValidator} = require('../validators/auth');
const {runValidation} = require('../validators');

router.post('/signup',userSignupValidator,runValidation,signup)
router.post('/signin',userSigninValidator,runValidation,signin)
router.post('/account-activation',acccountActivation)

//forgot reset password
router.put('/forgot-password',forgotPasswordValidator,runValidation,forgotPassword)
router.put('/reset-password',resetPasswordValidator,runValidation,resetPassword)

// google and facebook
router.post('/google-login',googleLogin)
// router.post('/facebook-login',facebookLogin)


module.exports= router;
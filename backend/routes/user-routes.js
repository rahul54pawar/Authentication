const express = require("express");
const {signup,login,verifytoken,getUser,refreshToken,logout} = require("../controller/user-controller")

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/user",verifytoken,getUser)
router.get("/refresh",refreshToken,verifytoken,getUser)


module.exports = router
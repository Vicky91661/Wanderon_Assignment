const express = require("express");
const router = express.Router();

const userAuth = require("../middlewares/userMiddleware/userAuth")
const {Signin ,Signup,ChangePassword}  = require("../controller/userController")

router.post("/signin",Signin)
router.post("/signup",Signup)
router.put("/changePassword",userAuth,ChangePassword)

module.exports = router;
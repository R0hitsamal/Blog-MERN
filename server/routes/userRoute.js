const express = require("express")
const Register = require("../controller/user")
const router =  express.Router()

router.post("/register",Register)

module.exports =  router;
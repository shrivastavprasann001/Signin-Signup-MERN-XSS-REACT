const express = require("express");
const route = express.Router(); // create routes
const userController = require("../controller/UserContoller");
const { SignupValidation, SigninValidation } = require("../middlewares/zod")
const { auth } = require("../middlewares/auth")
//User Routes
route.get("/signup", userController.register);
route.post("/signup", SignupValidation, userController.registersave);
route.get("/signin", auth, userController.getuserlogin);
route.post("/signin", SigninValidation, userController.postuserlogin);

module.exports = route;

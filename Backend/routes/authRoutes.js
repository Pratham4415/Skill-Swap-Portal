const express = require("express");
const route = express.Router();
const { userRegister, userLogin } = require('../controllers/authController')

route.post("/register",userRegister);
route.post("/login", userLogin);


exports.route = route;


const express = require("express");
const route = express.Router();
const { updateUser } = require('../controllers/userController')
const {verifyToken} = require('../middleware/authmiddleware')

route.put("/update", verifyToken ,updateUser)

exports.route = route;
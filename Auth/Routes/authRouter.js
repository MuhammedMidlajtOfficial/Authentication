const express = require('express')
const authController = require('../Controller/authController')
const authRouter = express.Router()

authRouter.post('/login',authController.postLogin)
authRouter.post('/signup',authController.postSignup)

module.exports = authRouter
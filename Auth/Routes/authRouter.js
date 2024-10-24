const express = require('express')
const authController = require('../Controller/authController')
const authMiddleware = require('../Middleware/authMiddleware')
const authRouter = express.Router()

authRouter.get('/login',authMiddleware.isUser, authController.getLogin)
authRouter.post('/login',authController.postLogin)
authRouter.post('/signup',authController.postSignup)

module.exports = authRouter